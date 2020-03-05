const express = require("express");
const db = require("../models");
const { isLoggedIn } = require("./middleware");
const router = express.Router();

const { Op } = db.Sequelize;

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user && req.user.id
      },
      attributes: ["id"]
    });
    const followings = await user.getFollowings({
      // attributes: ["id"]
    });
    console.log("followings :", followings);
    // if (followings.length !== 0) {
    //   const followingPosts = await Promise.all(
    //     followings.map(f =>
    //       db.Post.findAll({
    //         where: {
    //           UserId: f,
    //           publictarget: {
    //             [db.Sequelize.Op.ne]: 2 // publictarget이 나만 보기가 아닐때
    //           }
    //         },
    //         include: [
    //           {
    //             model: db.User,
    //             attributes: ["nickname"]
    //           },
    //           {
    //             model: db.Image
    //           },
    //           {
    //             model: db.User,
    //             through: "Like",
    //             as: "Likers",
    //             attributes: ["id"]
    //           },
    //           {
    //             model: db.Comment,
    //             attributes: ["content"]
    //           },
    //           {
    //             model: db.Post,
    //             as: "Share",
    //             include: [
    //               {
    //                 model: db.User,
    //                 attributes: ["id", "nickname"]
    //               },
    //               {
    //                 model: db.Image
    //               }
    //             ]
    //           }
    //         ],
    //         order: [["createAt", "DESC"]]
    //       })
    //     )
    //   );
    //   console.log("followingPosts :", followingPosts);
    // }
    let where = {
      publictarget: { [Op.ne]: 2 }
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        ...where,
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const Posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"]
            }
          ],
          attributes: ["id", "content", "createdAt"]
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10)
    });
    // const test = Posts.getUser({ where: { userId } });
    // console.log(test);
    return res.status(200).json(Posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/explore", isLoggedIn, async (req, res, next) => {
  try {
    let where = { publictarget: 0 };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        ...where,
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const explores = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"]
            }
          ],
          attributes: ["id", "content", "createdAt"]
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10)
    });
    res.status(200).json(explores);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;

const express = require("express");
const db = require("../models");
const { isLoggedIn } = require("./middleware");
const router = express.Router();

const { Op } = db.Sequelize;

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const followingList = req.user.Followings.map(v => v.id);
    followingList.unshift(req.user.id); // 로그인 한 유저 아이디
    console.log("팔로우목록 확인해보자 :", followingList);
    //[Op.in] : [1,2,3,4] 다 가져옴.
    //[Op.ne] : 2가 아닌 것들
    //[Op.lt] : < 10
    let where = {
      publictarget: { [Op.ne]: 2 },
      UserId: {
        [Op.in]: followingList
      }
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
      order: [
        ["createdAt", "DESC"],
        [{ model: db.Image }, "id", "ASC"]
      ],
      limit: parseInt(req.query.limit, 10)
    });
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
      order: [
        ["createdAt", "DESC"],
        [{ model: db.Image }, "id", "ASC"],
        [{ model: db.Comment }, "createdAt", "ASC"]
      ],
      limit: parseInt(req.query.limit, 10)
    });

    res.status(200).json(explores);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;

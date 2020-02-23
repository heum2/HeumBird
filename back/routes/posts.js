const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user && req.user.id
      },
      attributes: ["id"]
    });
    const followings = await user.getFollowings({
      attributes: ["id"]
    });
    console.log("followings :", followings);
    if (followings.length !== 0) {
      const followingPosts = await Promise.all(
        followings.map(f =>
          db.Post.findAll({
            where: {
              UserId: f,
              publictarget: {
                [db.Sequelize.Op.ne]: 2 // publictarget이 나만 보기가 아닐때
              }
            },
            include: [
              {
                model: db.User,
                attributes: ["id", "nickname"]
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
                attributes: ["content"]
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
            order: [["createAt", "DESC"]]
          })
        )
      );
      console.log("followingPosts :", followingPosts);
    }
    const Posts = await db.Post.findAll({
      where: {
        UserId: req.user.id,
        publictarget: { [db.Sequelize.Op.ne]: 2 }
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
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
      order: [["createdAt", "DESC"]]
    }); // 댓글도 추가, limit도 추가해줘야함.
    // console.log(Posts);
    return res.status(200).json(Posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;

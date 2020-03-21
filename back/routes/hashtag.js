const express = require("express");
const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();
const { Op } = db.Sequelize;

router.get("/:tag", isLoggedIn, async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
          attributes: ["name"]
        },
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"]
            }
          ],
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
    const postsArray = [];
    for (const value of posts) {
      if (value.publictarget === 0) {
        postsArray.push(value);
      } else if (value.publictarget === 1) {
        const followingList = req.user.Followings.map(v => v.id);
        followingList.unshift(req.user.id);
        followingList.includes(value.UserId) && postsArray.push(value);
      } else {
        value.UserId === req.user.id && postsArray.push(value);
      }
    }
    if (postsArray.length !== 0) {
      return res.status(200).json(postsArray);
    }
    return res.status(401).send("잘못된 접근 방식입니다!");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/find", async (req, res, next) => {
  try {
    const hashtag = await db.Hashtag.findAll({
      where: {
        name: {
          [Op.like]: "%" + req.body.tag + "%"
        }
      },
      include: [
        {
          model: db.Post,
          where: { publictarget: 0 },
          attributes: []
        }
      ],
      attributes: ["name"]
    });
    return res.status(200).json(hashtag);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

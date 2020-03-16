const express = require("express");
const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();
const { Op } = db.Sequelize;

router.get("/:tag", isLoggedIn, async (req, res, next) => {
  try {
    const followingList = req.user.Followings.map(v => v.id);
    followingList.unshift(req.user.id);
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
    const posts = await db.Post.findAll({
      where,
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
    const isEmpty = JSON.stringify(posts);
    if (isEmpty.length !== 0) {
      return res.status(200).json(posts);
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

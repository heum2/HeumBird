const express = require("express");
const db = require("../models");
const { isLoggedIn } = require("./middleware");
const router = express.Router();

const { Op } = db.Sequelize;

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const followingList = req.user.Followings.map((v) => v.id);
    followingList.unshift(req.user.id); // 로그인 한 유저 아이디
    //[Op.in] : [1,2,3,4] 다 가져옴.
    //[Op.ne] : 2가 아닌 것들
    //[Op.lt] : < 10
    let where = {
      publictarget: { [Op.ne]: 2 },
      UserId: {
        [Op.in]: followingList,
      },
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        ...where,
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }

    const Posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"],
            },
          ],
          attributes: ["nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"],
            },
          ],
          attributes: ["id", "content", "createdAt"],
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: db.Image }, "id", "ASC"],
      ],
      limit: parseInt(req.query.limit, 10),
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
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }
    const explores = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"],
            },
          ],
          attributes: ["nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"],
            },
          ],
          attributes: ["id", "content", "createdAt"],
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: db.Image }, "id", "ASC"],
        [{ model: db.Comment }, "createdAt", "ASC"],
      ],
      limit: parseInt(req.query.limit, 10),
    });

    res.status(200).json(explores);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/like", isLoggedIn, async (req, res, next) => {
  try {
    let where;
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }
    const likes = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"],
            },
          ],
          attributes: ["nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          where: {
            id: req.user.id,
          },
          attributes: ["id"],
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"],
            },
          ],
          attributes: ["id", "content", "createdAt"],
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: db.Image }, "id", "ASC"],
        [{ model: db.Comment }, "createdAt", "ASC"],
      ],
      limit: parseInt(req.query.limit, 10),
    });

    res.status(200).json(likes);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/:nickname", async (req, res, next) => {
  try {
    const regexp = /^[0-9]*$/g;
    let nickname = decodeURIComponent(req.params.nickname);
    if (regexp.test(nickname)) {
      const postUserId = await db.Post.findOne({
        where: {
          id: nickname,
        },
      });
      if (!postUserId) {
        return res.status(404).send("게시글이 존재하지 않습니다.");
      }
      const userInfo = await postUserId.getUser({
        attributes: ["nickname"],
      });
      const jsonInfo = userInfo.toJSON();
      nickname = jsonInfo.nickname;
    }
    const user = await db.User.findOne({
      where: {
        nickname: nickname,
      },
      include: [
        {
          model: db.User,
          as: "Followers",
          attributes: ["id", "nickname"],
        },
      ],
      attributes: [
        "id",
        "email",
        "nickname",
        "publictarget",
        "introduce",
        "phonenumber",
      ],
    });
    let where = {};
    const followingList = user.Followers.map((v) => v.id); // 팔로워 목록
    if (req.user.id === user.id) {
      // 로그인유저의 프로필이니?
      where = {};
    } else if (followingList.includes(req.user.id)) {
      // 팔로워 목록에 있니?
      where = {
        publictarget: {
          [Op.ne]: 2,
        },
      };
    } else {
      // 일반 유저니?
      where = {
        publictarget: 0,
      };
    }

    if (parseInt(req.query.lastId, 10)) {
      where = {
        ...where,
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }
    const post = await user.getPosts({
      where,
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"],
            },
          ],
          attributes: ["nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"],
            },
          ],
          attributes: ["id", "content", "createdAt"],
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [{ model: db.Image }, "id", "ASC"],
        [{ model: db.Comment }, "createdAt", "ASC"],
      ],
      limit: parseInt(req.query.limit, 10),
    });
    return res.status(200).json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

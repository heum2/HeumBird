const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const db = require("../models");
const { isLoggedIn } = require("./middleware");
const router = express.Router();
const { Op } = db.Sequelize;

const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "uploads");
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    done(null, basename + new Date().valueOf() + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }
});

router.post("/image", isLoggedIn, upload.array("image"), async (req, res) => {
  const [image, created] = await db.Image.findOrCreate({
    where: {
      UserId: req.user.id
    },
    defaults: {
      src: req.files[0].filename,
      UserId: req.user.id
    }
  });
  if (created) {
    return res.status(200).json({ src: image.src });
  } else {
    await db.Image.update(
      {
        src: req.files[0].filename
      },
      {
        where: { UserId: req.user.id }
      }
    );
    return res.status(200).json({ src: req.files[0].filename });
  }
});

router.delete("/image", isLoggedIn, async (req, res, next) => {
  try {
    await db.Image.destroy({
      where: {
        UserId: req.user.id
      }
    });
    return res.status(200).send("success");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/", isLoggedIn, (req, res) => {
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.status(200).json(user);
});

router.get("/:nickname", async (req, res, next) => {
  try {
    console.log("닉네임확인 : ", req.params.nickname);
    const user = await db.User.findOne({
      where: { nickname: req.params.nickname },
      include: [
        {
          model: db.Post,
          as: "Posts",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id"]
        },
        {
          model: db.Image,
          attributes: ["src"]
        }
      ],
      attributes: ["id", "email", "nickname", "publictarget"]
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    return res.status(200).json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const User = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: "Posts",
              attributes: ["id"]
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"]
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"]
            },
            {
              model: db.Image,
              attributes: ["src"]
            }
          ],
          attributes: ["id", "email", "nickname", "publictarget"]
        });
        return res.status(200).json(User);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send("logout 성공");
});

router.post("/duplicate", async (req, res, next) => {
  try {
    if (req.body.email) {
      const exUser = await db.User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (exUser) {
        return res.status(403).send("이미 존재하는 이메일입니다!");
      }
      return res.status(200).send("사용 가능한 이메일입니다!");
    } else if (req.body.nickname) {
      const exUser = await db.User.findOne({
        where: {
          nickname: req.body.nickname
        }
      });
      if (exUser) {
        return res.status(403).send("이미 존재하는 닉네임입니다!");
      }
      return res.status(200).send("사용 가능한 닉네임입니다!");
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      phonenumber: req.body.phoneNumber,
      publictarget: 0
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.patch("/access", isLoggedIn, async (req, res, next) => {
  try {
    console.log("id : ", req.user.id);
    console.log("publictarget :", req.body.publictarget);
    await db.User.update(
      { publictarget: req.body.publictarget },
      { where: { id: req.user.id } }
    );
    res.status(200).send(req.body.publictarget.toString());
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/:id/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });
    const followers = await user.getFollowers({
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10)
    });
    return res.status(200).json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    });
    await me.addFollowing(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    });
    await me.removeFollowing(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/suggested", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });
    const followers = await user.getFollowers({
      include: [
        {
          model: db.Image,
          attributes: ["src"]
        }
      ],
      attributes: ["id", "nickname"]
      // limit: parseInt(req.query.limit, 10),
      // offset: parseInt(req.query.offset, 10),
    });
    const followings = await user.getFollowings({
      attributes: ["id", "nickname"]
    });
    console.log("팔로잉들 확인 : ", followings);
    console.log("팔로워들 확인 : ", followers);
    return res.status(200).json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/find", async (req, res, next) => {
  try {
    console.log("닉네임 : ", req.body.nickname);
    const result = await db.User.findAll({
      where: {
        nickname: {
          [Op.like]: "%" + req.body.nickname + "%"
        }
      },
      include: [
        {
          model: db.Image,
          attributes: ["src"]
        }
      ],
      attributes: ["nickname"]
    });
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");
const { isLoggedIn } = require("./middleware");
const router = express.Router();

router.get("/", isLoggedIn, (req, res, next) => {
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.status(200).json(user);
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
              attributes: ["id", "publictarget"]
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

router.get("/:id/suggested", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });
    const followers = await user.getFollowers({
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

module.exports = router;

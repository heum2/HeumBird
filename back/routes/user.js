const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../models");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다!");
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.error(err);
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
          attributes: ["id", "email", "nickname", "publictarget"]
        });
        console.log(User);
        return res.json(User);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post("/duplicate", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return res.status(403).send("이미 존재하는 이메일입니다!");
    }
    return res.status(200).send("사용 가능한 이메일입니다!");
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
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("hi");
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
      phonenumber: req.body.phoneNumber
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;

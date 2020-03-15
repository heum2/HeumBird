const express = require("express");
const db = require("../models");

const router = express.Router();
const { Op } = db.Sequelize;
router.post("/find", async (req, res, next) => {
  try {
    const hashtag = await db.Hashtag.findAll({
      where: {
        name: {
          [Op.like]: "%" + req.body.tag + "%"
        }
      },
      attributes: ["name"]
    });
    return res.status(200).json(hashtag);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

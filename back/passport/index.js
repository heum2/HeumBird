const passport = require("passport");

const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Post,
            as: "Posts",
            attributes: ["id"]
          },
          {
            model: db.User,
            as: "Followings",
            attributes: ["id", "nickname"]
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id", "nickname"]
          },
          {
            model: db.Image,
            attributes: ["src"]
          },
          {
            model: db.Post,
            through: "Like",
            as: "Liked",
            attributes: ["id"]
          }
        ],
        attributes: [
          "id",
          "email",
          "nickname",
          "publictarget",
          "introduce",
          "phonenumber"
        ]
      });

      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};

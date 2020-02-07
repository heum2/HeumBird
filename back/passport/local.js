const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { email }
          });
          if (!user) {
            return done(null, false, {
              reason: "이메일과 비밀번호를 확인해주세요!"
            });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, {
            reason: "이메일과 비밀번호를 확인해주세요!"
          });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};

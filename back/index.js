const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const hpp = require("hpp");
const helmet = require("helmet");
const https = require("https");
const http = require("http");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");

const prod = process.env.NODE_ENV === "production";

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: /heumbird\.com$/,
      credentials: true
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(cors({ origin: true, credentials: true }));
}

app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false, // 매번 새션 강제 저장
    saveUninitialized: false, //빈 값도 저장
    secret: process.env.COOKIE_SECRET, // 쿠키에 대한 암호화
    cookie: {
      // 쿠키 설정
      httpOnly: true, // 쿠키를 자바스크립트에서 접근을 못함
      secure: prod, // https를 쓸 때 true로 해줘야함.
      domain: prod && ".heumbird.com"
    },
    name: "duzee"
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("heumbird 백엔드 정상 동작!");
});

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

if (prod) {
  const lex = require("greenlock-express").create({
    version: "draft-11",
    configDir: "/etc/letsencrypt",
    server: "https://acme-v02.api.letsencrypt.org/directory",
    email: "jwh6295@gmail.com",
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ["api.heumbird.com"];
      } else {
        opts.email = "jwh6295@gmail.com";
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000
  });
  https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
  http.createServer(lex.middleware(require("redirect-https")())).listen(80);
} else {
  app.listen(prod ? process.env.PORT : 3060, () => {
    console.log(`server is running on ${prod ? process.env.PORT : 3060}`);
  });
}

const db = require("../models");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // isAuthenticated => express랑 passport에서 사용하는 로그인 여부 함수
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // isAuthenticated => express랑 passport에서 사용하는 로그인 여부 함수
    next();
  } else {
    res.status(401).send("로그인 한 사용자는 접근할 수 없습니다.");
  }
};

exports.isPost = async (req, res, next) => {
  const post = await db.Post.findOne({ where: { id: req.params.id } });
  if (!post) {
    res.status(404).send("게시글이 존재하지 않습니다.");
  }
  req.post = post; //eq 안에 .post를 r 담아 데이터를 넘겨준다.
  next();
};

const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../models");
const { isLoggedIn, isPost } = require("./middleware");
const router = express.Router();

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

router.post("/images", upload.array("image"), (req, res) => {
  return res.status(200).json(req.files.map(v => v.filename));
});

router.post("/", upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      publictarget: req.body.publictarget,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase()
            }
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map(image => {
            return db.Image.create({ src: image });
          })
        );
        await newPost.addImages(images);
      } else {
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"]
            }
          ],
          attributes: ["nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"]
            }
          ],
          attributes: ["id", "content", "createdAt"]
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ]
    });
    return res.status(200).json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/comment", isLoggedIn, isPost, async (req, res, next) => {
  try {
    const newComment = await db.Comment.create({
      PostId: req.post.id,
      UserId: req.user.id,
      content: req.body.content
    });
    await req.post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"]
            }
          ],
          attributes: ["nickname"]
        }
      ],
      attributes: ["id", "content", "createdAt"]
    });
    return res.status(200).json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/like", isLoggedIn, isPost, async (req, res, next) => {
  try {
    await req.post.addLiker(req.user.id);
    return res.status(200).json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/like", isLoggedIn, isPost, async (req, res, next) => {
  try {
    await req.post.removeLiker(req.user.id);
    return res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id", isLoggedIn, isPost, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"]
            }
          ],
          attributes: ["nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"]
            }
          ],
          attributes: ["id", "content", "createdAt"]
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ],
      order: [
        [{ model: db.Image }, "id", "ASC"],
        [{ model: db.Comment }, "createdAt", "ASC"]
      ]
    });
    if (post.publictarget === 0) {
      // 전체공개
      return res.status(200).json(post);
    }
    if (post.publictarget === 1) {
      // 팔로우 공개
      const followCheck = JSON.stringify(
        req.user.Followings.findIndex(v => v.id === post.UserId)
      );
      if (followCheck != -1 || post.UserId === req.user.id) {
        return res.status(200).json(post);
      }
      return res.status(403).send("잘못된 접근입니다.");
    }
    if (post.publictarget === 2 && post.UserId === req.user.id) {
      // 나만 보기
      return res.status(200).json(post);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id", isLoggedIn, isPost, async (req, res, next) => {
  try {
    await db.Post.destroy({
      where: {
        id: req.params.id
      }
    });
    await db.Image.destroy({
      where: {
        PostId: req.params.id
      }
    });
    await db.Comment.destroy({
      where: {
        PostId: req.params.id
      }
    });
    res.status(200).send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/:id", isLoggedIn, isPost, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    await db.Post.update(
      {
        content: req.body.content,
        publictarget: req.body.publictarget
      },
      {
        where: { id: req.params.id }
      }
    );
    const editPost = await db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Image,
              attributes: ["src"]
            }
          ],
          attributes: ["nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["nickname"]
            }
          ],
          attributes: ["id", "content", "createdAt"]
        },
        {
          model: db.Post,
          as: "Share",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ]
    });
    if (hashtags) {
      const test = await db.PostHashtag.destroy({
        where: {
          PostId: req.params.id
        }
      });
      console.log("test 확인:", test);
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase()
            }
          })
        )
      );
      console.log("hashtag 확인! :", result);
      await editPost.addHashtags(result.map(r => r[0]));
    }
    console.log("확인!", editPost);
    res.status(200).json(editPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

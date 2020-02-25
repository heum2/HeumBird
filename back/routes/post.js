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
      console.log(result);
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
    console.log("댓글 처음에 값 머냐 : ", req.post);
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

module.exports = router;
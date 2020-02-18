const express = require("express");
const multer = require("multer");
const path = require("path");

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

module.exports = router;

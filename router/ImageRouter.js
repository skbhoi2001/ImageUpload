const express = require("express");
const {
  postImage,
  getImages,
  imageUpload,
} = require("../controllers/ImageController");

const imageRouter = express.Router();

imageRouter.get("/", getImages);
imageRouter.post("/upload", imageUpload.single("image"), postImage);

module.exports = imageRouter;

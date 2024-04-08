require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Image = require("../model/ImageModel");

//! configure cloudnary

cloudinary.config({
  api_key: process.env.CLOUDNARY_API_KEY,
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

//!CONFIGURE MULTER STORAGE CLOUD

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images-folder",
    format: async (req, file) => "png",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [{ width: 800, height: 600, crop: "fill" }],
  },
});

//! CONFIGURE MULTER

const imageUpload = multer({
  storage,
  limits: 1024 * 1020 * 5,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not a quality image ", false));
    }
  },
});

const postImage = async (req, res) => {
  try {
    console.log("1", req.file);
    const uploaded = await Image.create({
      url: req.file.path,
      public_id: req.file.filename,
    });

    res.json({ message: "FIle upload", uploaded });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.find();

    res.json({ images });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  imageUpload,
  postImage,
  getImages,
};

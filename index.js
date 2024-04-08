const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const imageRouter = require("./router/ImageRouter");
const PORT = 5000;
const app = express();
app.use(cors());

app.use(
  cors({
    origin: "*", // Allow requests from any origin
  })
);

//! CONNECT TO DB

mongoose
  .connect(
    "mongodb+srv://soumyak:Soumyak_2001@cluster0.d1f22tp.mongodb.net/UPLOAD"
  )
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

//! Router
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/image", imageRouter);

// ! Start server
app.listen(PORT, console.log("PORT", PORT));

// ? node --watch server -> to avoid nodemon

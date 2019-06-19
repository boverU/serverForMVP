const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

// Import Routes

const postsRoute = require("./routes/posts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("Some info has been required from database");
});

app.listen(5003);

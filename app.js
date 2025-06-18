const express = require("express");
const app = express();
const router = require("./routers/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(router);

module.exports = app;

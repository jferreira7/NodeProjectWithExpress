"use strict";
const express = require("express");
const expressHandlebars = require("express-handlebars");
const fortune = require("./lib/fortune.js");

const app = express();

const port = process.env.PORT || 8000;

//Static Files
app.use(express.static(__dirname + "/public"));

//Handlebars
var hbs = expressHandlebars.create({
  defaultLayout: "main",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Routes
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  console.error(err.mensage);
  res.status(500);
  res.render("500");
});

//Server start
app.listen(port, () => {
  console.log("Server rodando em http://localhost:" + port);
});

var express = require("express");
var router = express.Router();

const allCategories = require("../data/categoriesData");
var newsController = require("../controllers/NewsController");

router.get("/", function (req, res, next) {
  res.json(allCategories);
});

router.get("/:categoryId", newsController.getNews);

module.exports = router;

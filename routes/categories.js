var express = require("express");
var router = express.Router();
const allCategories = require("../data/categoriesData");
const userData = require("../data/usersData");
var newsController = require("../controllers/NewsController");
var md5 = require("md5");

var user = null;

router.get("/", function (req, res, next) {
  res.json(allCategories);
});

router.post("/", (req, res, next) => {
  user = req.body;
  checkUser(user);
  user.token = md5(user.email + user.password);
  res.json(user);
});

var checkUser = (person) => {
  var found = false;
  var val;
  userData.forEach((element) => {
    if (person.email == element.email && person.password == element.password) {
      found = true;
      element.token = md5(person.email + person.password);
      val = true;
    }
  });
};

var checkToken = (req, res, next) => {
  var found = false;
  if (req.params.token == undefined) {
    req.query.user = "invalid";
  } else {
    userData.forEach((element) => {
      if (req.params.token == element.token) {
        found = true;
        req.query.user = true;
      }
    });
    if (!found) {
      req.query.user = false;
    }
  }
  next();
};

router.get("/:categoryId/:token", checkToken, newsController.getNews);
router.get("/:categoryId/", checkToken, newsController.getNews);

module.exports = router;

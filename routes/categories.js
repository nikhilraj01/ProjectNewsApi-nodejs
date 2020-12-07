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
});

var checkUser = (req, res, next) => {
  var found = false;
  //in the case no user is found from query
  if (user == null) {
    req.query.user = false;
    next();
  } else {
    //checking user credentials through actual user data
    userData.forEach((element) => {
      if (md5(user.email + user.password) == element.key) {
        found = true;
        req.query.user = true;
        next();
      }
    });
    //in case username and password do not match any user accounts
    if (!found) {
      req.query.user = "invalid";
      next();
    }
  }
};

router.get("/:categoryId", checkUser, newsController.getNews);

module.exports = router;

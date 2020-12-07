const allCategories = require("../data/categoriesData");
const fetch = require("node-fetch");

class NewsController {
  getNews(req, res, next) {
    var found = false;

    allCategories.forEach((element) => {
      if (element.url == req.params.categoryId) {
        //checking if selected category exists or not
        found = true;
        if (element.auth == "false") {
          //checking if selected category requires user to be logged in
          fetch(
            `https://newsapi.org/v2/top-headlines?country=in&category=${req.params.categoryId}&apiKey=f9c552d4018842f280197a13e0ef9afa`
          )
            .then((response) => response.json())
            .then((data) => res.send(data.articles.slice(0, 10)));
        }
        //in case the category requires authorization, we check if user is logged in or not
        else {
          //case where user is logged in
          if (req.query.user == true) {
            fetch(
              `https://newsapi.org/v2/top-headlines?country=in&category=${req.params.categoryId}&apiKey=f9c552d4018842f280197a13e0ef9afa`
            )
              .then((response) => response.json())
              .then((data) => res.send(data.articles.slice(0, 10)));
          }
          //case where email and password do not match
          else if (req.query.user == "invalid") {
            res.send(`Invalid email or password. Login in again to continue`);
          }
          //case when no user is logged in
          else {
            res.send(
              `Not currently logged in. Need authorization for viewing news on ${req.params.categoryId}. Login to view this content`
            );
          }
        }
      }
    });

    //in case category is not found
    if (!found) {
      res.send(
        `Oops! You seem to have run into an error- category: ${req.params.categoryId} not found.`
      );
    }
  }
}

newsController = new NewsController();
module.exports = newsController;

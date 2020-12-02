const allCategories = require("../data/categoriesData");
const fetch = require("node-fetch");

class NewsController {
  getNews(req, res, next) {
    var found = false;
    allCategories.forEach((element) => {
      if (element.url == req.params.categoryId) {
        found = true;
        fetch(
          `https://newsapi.org/v2/top-headlines?country=in&category=${req.params.categoryId}&apiKey=f9c552d4018842f280197a13e0ef9afa`
        )
          .then((response) => response.json())
          .then((data) => res.send(data.articles.slice(0, 10)));
      }
    });
    if (!found) {
      res.send(
        `Oops! You seem to have run into an error- category: ${req.params.categoryId} not found.`
      );
    }
  }
}

newsController = new NewsController();
module.exports = newsController;

var express = require("express");
var axios = require("axios");
fs = require("fs");
router = express.Router();


// Favorites
router
  .route("/")

  /* GET favorites listing. */
  .get(function (req, res, next) {
    var movies = JSON.parse(fs.readFileSync("./data.json"));
    res.json(movies);
  })

  .post(function (req, res) {
    if (!req.body.name || !req.body.oid) {
      res.send("Error");
      return;
    }
    var data = JSON.parse(fs.readFileSync("./data.json"));
    data.push(req.body);
    fs.writeFile("./data.json", JSON.stringify(data), function(error) {
      console.log(error)
    });
    res.send(data);
  });

module.exports = router;

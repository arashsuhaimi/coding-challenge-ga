var express = require("express");
var router = express.Router();
var axios = require("axios");

const omdbURL = "http://www.omdbapi.com/";

router.get("/search", async (req, res, next) => {
  const { q, y, p } = req.query;

  console.log(q, y);
  if (!q) {
     res.render("search", {
      results: [],
      maxPage: 0,
      total: 0,
    });
  }
  try {
    const resp = await axios.get(omdbURL, {
      params: {
        apikey: "508aad3a",
        s: q,
        y,
        page: p || 1,
      },
    });

    const data = resp.data;

    res.render("search", {
      results: data.Search,
      maxPage: Math.ceil(data.totalResults / 10),
      total: data.totalResults,
    });
  } catch (err) {
    // Handle Error Here
    console.error(err);
    res.sendStatus(200);
  }
});

router.get("/details", async (req, res, next) => {
  const { imdbId } = req.query;

  console.log(imdbId);

  try {
    const resp = await axios.get(omdbURL, {
      params: {
        apikey: "508aad3a",
        i: imdbId,
      },
    });

    const data = resp.data;
    console.log(data);
    res.render("details", {
      data
    });
  } catch (err) {
    // Handle Error Here
    console.error(err);
    res.sendStatus(200);
  }
});

router.get("/favorites", async (req, res, next) => {
  try {
  //get a list all the favorites movies
  let resp = await axios.get('http://localhost:3000/favorites')
  console.log(resp);
  res.render("favorites", {
    resp: resp.data
  });
    
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
});
module.exports = router;

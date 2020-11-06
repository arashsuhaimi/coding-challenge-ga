var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

var index = require("./routes/index");
var favorites = require("./routes/favorites");
var movie = require("./routes/movie");

app.use("/", index);
app.use("/favorites", favorites);
app.use("/movie", movie);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

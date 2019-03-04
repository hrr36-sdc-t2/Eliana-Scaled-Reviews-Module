const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  findMostRecent,
  findMostRelevant,
  findFilteredReviews
} = require("../database/index.js");

// for migrating and seeding db
var config = require("../knexfile.js");
var env = "development";
var knex = require("knex")(config[env]);

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/rooms/reviews/recent/:listing_id", function (req, res) {
  console.log("Inside server for get request");

  findMostRecent(req.params.listing_id).then(records => {
    console.log("retrieved recent reviews from DB!!!");
    return res.status(200).send(records);
  });
});

app.get("/rooms/reviews/relevant/:listing_id", function (req, res) {
  console.log("Inside server for relevant get request");
  findMostRelevant(req.params.listing_id).then(records => {
    console.log("retrieved relevant reviews from DB!!!");
    return res.status(200).send(records);
  });
});

app.get("/rooms/reviews/filter/:listing_id", function (req, res) {
  console.log("on server side!!!");
  findFilteredReviews(req.params.listing_id, req.query.data).then(records => {
    return res.status(200).send(records);
  });
});

app.listen(port);
console.log("Listening on port", port);

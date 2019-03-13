const nr = require('newrelic');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  findMostRecent,
  findMostRelevant,
  findFilteredReviews
} = require('../database/mongodb.js');
const mongodb = require('../database/mongodb.js');

mongodb.dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/rooms/reviews/recent/:listing_id', function (req, res) {
  console.log('Inside server for get request');

  findMostRecent(parseInt(req.params.listing_id, 10))
  .then((records) => {
    return res.status(200).json(records);
  });
});

app.get('/rooms/reviews/relevant/:listing_id', function (req, res) {
  console.log('Inside server for relevant get request');
  findMostRelevant(parseInt(req.params.listing_id, 10)).then(records => {
    console.log('retrieved relevant reviews from DB!!!');
    return res.status(200).json(records);
  });
});

// app.get('/rooms/reviews/filter/:listing_id', function (req, res) {
//   console.log('on server side!!!');
//   findFilteredReviews(req.params.listing_id, req.query.data).then(records => {
//     return res.status(200).send(records);
//   });
// });

var port = 3000;
app.listen(port);
console.log('Listening on port', port);

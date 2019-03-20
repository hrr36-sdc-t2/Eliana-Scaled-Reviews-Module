const nr = require('newrelic');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  findMostRecent,
  findMostRelevant,
  findFilteredReviews,
  addNewReview,
  dbConnect
} = require('../database/mongodb.js');

dbConnect();

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

app.post('/rooms/reviews/:listing_id', function(req, res) {
  addNewReview(req.params.listing_id, {
    created_at: Date.now(),
    description: req.body.description,
    accuracy: parseInt(req.body.accuracy, 10),
    communication: parseInt(req.body.communication,10),
    cleanliness: parseInt(req.body.cleanliness,10),
    location: parseInt(req.body.location,10),
    check_in: parseInt(req.body.check_in,10),
    value: parseInt(req.body.value,10),
    customer_id: parseInt(req.body.customer_id,10)
  })
  .then((result) => {
    console.log('got into the .then');
    return res.status(200).json();

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

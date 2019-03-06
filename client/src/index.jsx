import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './stylesheets/style.scss';

import ReviewCount from './components/ReviewCount.jsx';
import ConditionsRatings from './components/ConditionsRatings.jsx';
import SearchReviews from './components/SearchReviews.jsx';
import DropDownSearch from './components/DropdownSearch.jsx';
import ReviewList from './components/ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
    this.setupReviews = this.setupReviews.bind(this);
    this.queryReviewListings = this.queryReviewListings.bind(this);
    this.customReviewListings = this.customReviewListings.bind(this);
  }

  componentDidMount() {
    this.grabReviews();
  }

  setupReviews(data) {
    this.setState({ reviews: data });
  }



  async grabReviews() {
    var getRandomInt = function (min, max) {
      var min = Math.ceil(min);
      var max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var randomListing = getRandomInt(0, 10000000);
    console.log(randomListing);
    try {
      const response = await axios.get('/rooms/reviews/recent/' + randomListing);
      this.setupReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  filterReviews(data) {
    if (data.length !== 0) {
      this.setState({ reviews: data });
    }
  }

  async queryReviewListings(query, listing_id) {
    axios
      .get('/rooms/reviews/filter', { params: { data: query, listing_id: listing_id } })
      .then(res => this.filterReviews(res.data));
  }

  async customReviewListings(query) {
    axios
      .get(`/rooms/reviews/${query}`)
      .then(res => this.filterReviews(res.data));
  }

  calculateUserRatings(users) {
    let totalAverage = 0;
    const ratings = {
      accuracy: 0,
      communication: 0,
      cleanliness: 0,
      location: 0,
      check_in: 0,
      value: 0,
    };
    // grab specific condtions rating from each user
    for (let i = 0; i < users.length; i += 1) {
      ratings.accuracy += users[i].accuracy;
      ratings.communication += users[i].communication;
      ratings.cleanliness += users[i].cleanliness;
      ratings.location += users[i].location;
      ratings.check_in += users[i].check_in;
      ratings.value += users[i].value;
    }
    for (const key in ratings) {
      // find the average rating from the users
      ratings[key] = Math.ceil(ratings[key] / users.length);
      totalAverage += ratings[key];
    }
    ratings.totalAverage = Math.ceil(totalAverage / 6);
    if (ratings.totalAverage === NaN) {
      ratings.totalAverage = 0;
    }
    return ratings;
  }

  render() {
    const { reviews } = this.state;
    const ratings = this.calculateUserRatings(reviews);

    return (
      <Container className="ReviewsContainer">
        <Row>
          <ReviewCount
            reviewLength={reviews.length}
            average={ratings.totalAverage}
          />
        </Row>
        <Row>
          <ConditionsRatings ratings={ratings} reviews={reviews} />
        </Row>
        <Row className="bottom-spacing top-spacing btn-toolbar">
          <SearchReviews handleSearchInput={this.queryReviewListings} />
          <DropDownSearch handleValueChange={this.customReviewListings} />
        </Row>
        <Row>
          <ReviewList reviews={reviews} />
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'));

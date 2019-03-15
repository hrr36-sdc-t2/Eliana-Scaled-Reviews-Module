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
    var listing_id;
    if (window.location.hash) {
      listing_id = parseInt(window.location.hash.substring(1));
    }
    if (!listing_id) {
      listing_id = this.getRandomInt(1, 10000000);
    }
    this.grabReviews(listing_id);
  }

  setupReviews(data) {
    this.setState({ reviews: data });
  }

  getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async grabReviews(listing_id) {
    console.log("fetching listing_id " + listing_id);
    try {
      const response = await axios.get('/rooms/reviews/recent/' + listing_id);
      console.log(response.data, 'this is the response from server');
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

  async queryReviewListings(query) {
    axios
      .get('/rooms/reviews/filter', { params: { data: query } })
      .then(res => this.filterReviews(res.data));
  }

  async customReviewListings(query) {
    axios
      .get(`/rooms/reviews/${query}` + this.state.review.listing_id)
      .then(res => this.filterReviews(res.data));
  }

  calculateUserRatings(reviews) {
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
    for (let i = 0; i < reviews.length; i += 1) {
      ratings.accuracy += reviews[i].accuracy;
      ratings.communication += reviews[i].communication;
      ratings.cleanliness += reviews[i].cleanliness;
      ratings.location += reviews[i].location;
      ratings.check_in += reviews[i].check_in;
      ratings.value += reviews[i].value;
    }
    for (const key in ratings) {
      // find the average rating from the users
      ratings[key] = Math.ceil(ratings[key] / reviews.length);
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

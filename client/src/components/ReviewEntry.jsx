import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ReviewEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      read: "Read More",
      dots: "..."
    };

    this.expandText = this.expandText.bind(this);
  }

  expandText() {
    let dots;
    if (this.state.expanded === false) {
      dots = "";
    } else {
      dots = "...";
    }
    this.setState({
      expanded: !this.state.expanded,
      dots: dots
    });
  }

  render() {
    return (
      <li className="review-entry bottom-spacing">
        <Row className="description-spacing">
          <Col className="images" lg={3} sm={3} xs={3} xl={3}>
            <Image
              src={this.props.review.avatar_url}
              className="thumbnail"
              roundedCircle
            />
          </Col>
          <Col lg={6} sm={8} xs={8} xl={6}>
            <Row className="username">{this.props.review.name}</Row>
            <Row>
              {moment(this.props.review.created_at)
                .startOf("day")
                .fromNow()}
            </Row>
          </Col>
        </Row>
        <Row className="desciption-align">
          <Col lg={12} sm={12} xs={12} xl={12}>
            {this.props.review.description.slice(0, 111)}
            {this.state.expanded && this.props.review.description.slice(111)}
            {!this.state.expanded &&
              this.props.review.description.length > 111 && (
                <span>
                  {this.state.dots}
                  <button onClick={this.expandText} className="read-btn">
                    {this.state.read}
                  </button>
                </span>
              )}
          </Col>
        </Row>
      </li>
    );
  }
}

export default ReviewEntry;

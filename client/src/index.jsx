// main js file where the rendering will happen and all the components are imported here
import React from "react";
import ReactDOM from "react-dom";
import Reviews from "./components/Reviews.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <Reviews />;
  }
}

ReactDOM.render(<App />, document.getElementById("reviews"));

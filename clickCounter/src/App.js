import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    count: 0
  };

  // Don't allow the 'count' to go below 0
  decrement = () => {
    const { count } = this.state;
    count !== 0
      ? this.setState({ count: count - 1 })
      : this.setState({ count: 0 });
  };

  render() {
    const { count } = this.state;
    return (
      <div className="app" data-test="component-app">
        <div>
          <h1 data-test="counter-display">
            The counter is currently: <span className="count">{count}</span>
          </h1>
          <hr />
          <button
            className="increment"
            data-test="increment-button"
            onClick={() => this.setState({ count: count + 1 })}
          >
            Increment
          </button>
          <button
            className="decrement"
            data-test="decrement-button"
            onClick={() => this.decrement()}
          >
            Decrement
          </button>
        </div>
      </div>
    );
  }
}

export default App;

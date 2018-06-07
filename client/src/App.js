import React, { Component } from "react";

import logo from "./logo.svg";

import "./App.css";

class App extends Component {
  state = {
    response: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => {
        window.myLogger.error(err);
      });
  }

  callApi = async () => {
    const response = await fetch("/api/helloe");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleErrorClick() {
    throw new Error("something wrong");
  }

  render() {
    window.myLogger.info("rendering");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <button onClick={this.handleErrorClick}>error</button>
      </div>
    );
  }
}

export default App;

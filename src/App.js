import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import MortgageCalculator from  './MortgageCalculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Built with React</h2>
        </div>
        <Header title="React Mortgage Calculator" />
        <MortgageCalculator principal="200000" years="30" rate="5"/>

      </div>
    );
  }
}

export default App;

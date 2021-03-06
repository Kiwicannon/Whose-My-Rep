import React, { Component } from 'react';
import './App.css';
import Representatives from './components/Representatives'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className='App-title'>Who's My Representative?</h2>
          <hr />
          <Representatives />
        </header>
      </div>
    );
  }
}

export default App;

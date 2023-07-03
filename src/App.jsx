import React from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import SwitchRoute from './components/Router/SwitchRoute';

function App() {
  return (
    <div className="App">
      <SwitchRoute />
    </div>
  );
}

export default App;

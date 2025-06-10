import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Test from './Pages/Test';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

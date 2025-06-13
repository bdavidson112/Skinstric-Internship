import './App.css';
import React from 'react';
import Home from './Pages/Home';
import Test from './Pages/Test';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Choice from './Pages/Choice';
import Analysis from './Pages/Analysis';
import Demographics from './Pages/Demographics';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/demographics" element={<Demographics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

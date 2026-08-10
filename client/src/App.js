import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";
 
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <Routes>
          <Route path="/" element={<Fib />} />
          <Route path="/otherpage" element={<OtherPage />} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;


Fib.js

import React, { useState, useEffect } from "react";
import axios from "axios";
 
const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");
 
  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);
 
  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };
 
  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    await axios.post("/api/values", {
      index: index,
    });
    setIndex("");
  };
 
  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };
 
  const renderValues = () => {
    const entries = [];
 
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
 
    return entries;
  };
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
 
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
 
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};
 
export default Fib;
import React, { useState } from 'react'
import { useLocation } from "react-router";
import Header from '../Components/Header'

function Demographics() {
  const location = useLocation();
  const apiData = location.state?.apiData;

  // Safely access the nested data object
  const data = apiData?.data;

  // Helper to get the key with the largest value in an object
  const getLargestKey = (obj) => {
    if (!obj) return "";
    return Object.entries(obj).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", -Infinity]
    )[0];
  };

  // Helper to sort object entries by value descending
  const getSortedEntries = (obj) => {
    if (!obj) return [];
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
  };

  // Safely extract the largest values from the nested data
  const race = getLargestKey(data?.race);
  const age = getLargestKey(data?.age);
  const gender = getLargestKey(data?.gender);

  const [selected, setSelected] = useState("");
  const [selectedRace, setSelectedRace] = useState(""); // for highlighting selected race
  const [selectedAge, setSelectedAge] = useState("");   // for highlighting selected age
  const [selectedSex, setSelectedSex] = useState("");   // for highlighting selected sex

  return (
    <div>
      <Header />
      <h2 className="analysis__subheader">A.I. ANALYSIS</h2>
      <h1 className="demo__title">DEMOGRAPHICS</h1>
      <p className="demo__sub--title">PREDICTED RACE & AGE</p>
      <div className="btn__selection--container">
        <button
          className={`btn__selection--race${selected === "race" ? " selected" : ""}`}
          onClick={() => setSelected("race")}
        >
          <h3 className="race__text">RACE</h3>
          <h3 className="race__value">{race}</h3>
        </button>
        <button
          className={`btn__selection--age${selected === "age" ? " selected" : ""}`}
          onClick={() => setSelected("age")}
        >
          <h3 className="age__text">AGE</h3>
          <h3 className="age__value">{age}</h3>
        </button>
        <button
          className={`btn__selection--sex${selected === "sex" ? " selected" : ""}`}
          onClick={() => setSelected("sex")}
        >
          <h3 className="sex__text">SEX</h3>
          <h3 className="sex__value">{gender}</h3>
        </button>
      </div>
      <div className="list__container">
        {selected === "race" && data?.race && (
          getSortedEntries(data.race).map(([raceKey, raceValue]) => (
            <button
              key={raceKey}
              className={`list__item${selectedRace === raceKey ? " selected" : ""}`}
              onClick={() => setSelectedRace(raceKey)}
            >
              <span className="race-key">{raceKey}</span>
              <span className="race-value">{Math.round(raceValue * 100)}%</span>
            </button>
          ))
        )}
        {selected === "age" && data?.age && (
          getSortedEntries(data.age).map(([ageKey, ageValue]) => (
            <button
              key={ageKey}
              className={`list__item${selectedAge === ageKey ? " selected" : ""}`}
              onClick={() => setSelectedAge(ageKey)}
            >
              <span className="race-key">{ageKey}</span>
              <span className="race-value">{Math.round(ageValue * 100)}%</span>
            </button>
          ))
        )}
        {selected === "sex" && data?.gender && (
          getSortedEntries(data.gender).map(([sexKey, sexValue]) => (
            <button
              key={sexKey}
              className={`list__item${selectedSex === sexKey ? " selected" : ""}`}
              onClick={() => setSelectedSex(sexKey)}
            >
              <span className="race-key">{sexKey}</span>
              <span className="race-value">{Math.round(sexValue * 100)}%</span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default Demographics

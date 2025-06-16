import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router";
import Header from '../Components/Header'
import { ReactComponent as CircleG } from "../SVG/Ellipse 172.svg";
import { ReactComponent as BackBtn } from "../Buttons/Back.svg"; 

function Demographics() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const apiData = location.state?.apiData;

  const data = apiData?.data;

  const getLargestKey = (obj) => {
    if (!obj) return "";
    return Object.entries(obj).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", -Infinity]
    )[0];
  };

  const getSortedEntries = (obj) => {
    if (!obj) return [];
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
  };

  const race = getLargestKey(data?.race);
  const age = getLargestKey(data?.age);
  const gender = getLargestKey(data?.gender);

  const [selected, setSelected] = useState("");
  const [selectedRace, setSelectedRace] = useState(""); 
  const [selectedAge, setSelectedAge] = useState("");   
  const [selectedSex, setSelectedSex] = useState("");   

  const getSelectedValue = () => {
    if (selected === "race" && selectedRace) {
      return <span className="race-key">{selectedRace}</span>;
    }
    if (selected === "age" && selectedAge) {
      return <span className="race-key">{selectedAge}</span>;
    }
    if (selected === "sex" && selectedSex) {
      return <span className="race-key">{selectedSex}</span>;
    }
    return null;
  };

  const getSelectedPercentage = () => {
    if (selected === "race" && selectedRace && data?.race) {
      return `${Math.round(data.race[selectedRace] * 100)}%`;
    }
    if (selected === "age" && selectedAge && data?.age) {
      return `${Math.round(data.age[selectedAge] * 100)}%`;
    }
    if (selected === "sex" && selectedSex && data?.gender) {
      return `${Math.round(data.gender[selectedSex] * 100)}%`;
    }
    return "";
  };

  const getTopKey = (obj) => {
    const sorted = getSortedEntries(obj);
    return sorted.length > 0 ? sorted[0][0] : "";
  };

  return (
    <div>
      <Header />
      <h2 className="analysis__subheader">A.I. ANALYSIS</h2>
      <h1 className="demo__title">DEMOGRAPHICS</h1>
      <p className="demo__sub--title">PREDICTED RACE & AGE</p>
      <button className='back__btn' onClick={() => navigate(-1)}>
        <BackBtn />
      </button>
      <div className="btn__selection--container">
        <button
          className={`btn__selection--race${selected === "race" ? " selected" : ""}`}
          onClick={() => {
            setSelected("race");
            setSelectedRace(getTopKey(data?.race));
          }}
        >
          <h3 className="race__text">RACE</h3>
          <h3 className="race__value">{race}</h3>
        </button>
        <button
          className={`btn__selection--age${selected === "age" ? " selected" : ""}`}
          onClick={() => {
            setSelected("age");
            setSelectedAge(getTopKey(data?.age));
          }}
        >
          <h3 className="age__text">AGE</h3>
          <h3 className="age__value">{age}</h3>
        </button>
        <button
          className={`btn__selection--sex${selected === "sex" ? " selected" : ""}`}
          onClick={() => {
            setSelected("sex");
            setSelectedSex(getTopKey(data?.gender));
          }}
        >
          <h3 className="sex__text">SEX</h3>
          <h3 className="sex__value">{gender}</h3>
        </button>
      </div>
      <div className="list__container">
        <div className="list__row">
          <p className="list__selection">
            {selected === "race" && "RACE"}
            {selected === "age" && "AGE"}
            {selected === "sex" && "SEX"}
          </p>
          <p className="list__confidence">A.I. Confidence</p>
        </div>
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
      <div className="percentage__display--container">
        <h2 className="display__text">
          {getSelectedValue()}
        </h2>
        <h2 className="display__value">{getSelectedPercentage()}</h2>
      </div>
        <CircleG className='circle__bg'/>
        <p className="warning__text">
            If A.I. estimate is wrong, select the correct one.
        </p>
        <button className="reset__btn">RESET</button>
        <button className="confirm__btn">CONFIRM</button>
    </div>
  )
}

export default Demographics

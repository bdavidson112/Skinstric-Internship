import React, { useState } from 'react'
import Header from '../Components/Header'
import { ReactComponent as Rombuses } from "../SVG/rombuses.svg";
import { ReactComponent as BackBtn } from "../Buttons/Back.svg";
import { ReactComponent as Proceed } from "../Buttons/Proceed.svg";
import { useNavigate } from "react-router";

function Test() {
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1); // 1: name, 2: location, 3: done
  const [userData, setUserData] = useState({ name: "", location: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidString = (str) => /^[A-Za-z\s]{2,}$/.test(str.trim());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setError(""); 
      if (step === 1) {
        if (!isValidString(inputValue)) {
          setError("Please enter a valid name (letters and spaces only).");
          return;
        }
        setUserData((prev) => ({ ...prev, name: inputValue.trim() }));
        setInputValue("");
        setStep(2);
      } else if (step === 2) {
        if (!isValidString(inputValue)) {
          setError("Please enter a valid location (letters and spaces only).");
          return;
        }
        const updatedData = { ...userData, location: inputValue.trim() };
        setUserData(updatedData);
        setInputValue("");
        setStep(3); 
        console.log("Saved data:", updatedData); 
      }
    }
  };

  return (
    <div>
        <Header />
        <h2 className="sub__title">TO START ANALYSIS</h2>
        <div className="Analysis__input--container">
          <div className="rombuses-wrapper">
            <Rombuses className="rombuses" />
            <div className="input-content">
              <p className="type__text">CLICK TO TYPE</p>
              {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
              {step === 1 && (
                <input 
                  type="text" 
                  className='input__name' 
                  placeholder='Introduce Yourself'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}
              {step === 2 && (
                <input 
                  type="text" 
                  className='input__name' 
                  placeholder='Where are you from?'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}
            </div>
          </div>
        </div>
          {step === 3 && (
            <button
              className="proceed__btn"
              onClick={() => navigate("/choice")}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <Proceed />
            </button>
          )}
      <button className='back__btn' onClick={() => navigate("/")}>
        <BackBtn />
      </button>
      
    </div>
  )
}

export default Test

import React, { useState } from 'react'
import Header from '../Components/Header'
import { ReactComponent as Rombuses } from "../SVG/rombuses.svg";
import { ReactComponent as BackBtn } from "../Buttons/Back.svg";
import { ReactComponent as Proceed } from "../Buttons/Proceed.svg";

function Test() {
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1); // 1: name, 2: city
  const [userData, setUserData] = useState({ name: "", city: "" });
  const [isComplete, setIsComplete] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) {
        setUserData((prev) => ({ ...prev, name: inputValue }));
        setInputValue("");
        setStep(2);
      } else if (step === 2) {
        const updatedData = { ...userData, city: inputValue };
        setUserData(updatedData);
        setInputValue("");
        setIsComplete(true);
        console.log("Saved data:", updatedData);
      }
    }
  };

  return (
    <div>
        <Header />
      <h2 className="sub__title">TO START ANALYSIS</h2>
      <Rombuses className='rombuses' />
      <p className="type__text">CLICK TO TYPE</p>
      {step === 1 && (
        <input 
          type="text" 
          className='input__name' 
          placeholder='Introduce Yourself'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
      {step === 2 && (
        <input 
          type="text" 
          className='input__name' 
          placeholder='your city name'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
      <BackBtn className='back__btn' href='/'/>
      {isComplete && <Proceed className='proceed__btn' href='/' />}
    </div>
  )
}

export default Test

import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router";
import Header from '../Components/Header'
import { ReactComponent as Rombuses } from "../SVG/rombuses.svg";
import { ReactComponent as BackBtn } from "../Buttons/Back.svg";
import { ReactComponent as SummaryBtn } from "../Buttons/summary.svg";

function Analysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiData = location.state?.apiData;
  const [demographicsSelected, setDemographicsSelected] = useState(false);

  console.log("Received API data:", apiData); 

  return (
    <div>
      <Header />
      <h2 className="analysis__subheader">A.I. ANALYSIS</h2>
      <div className="analysis__para--CONTAINER">
        <p className="analysis__para">A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p className="analysis__para">FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </div>
      <Rombuses className='analysis__rombuses'/>
      <div className="analysis__choice--container">
        <button
          className="analysis__btn"
          onClick={() => setDemographicsSelected(true)}
        >
          <p className="analysis__btn--txt">DEMOGRAPHICS</p>
        </button>
        <button className="analysis__btn">
          <p className="analysis__btn--txt">COSMETIC CONCERNS</p>
        </button>
        <button className="analysis__btn">
          <p className="analysis__btn--txt">SKIN TYPE DETAILS</p>
        </button>
        <button className="analysis__btn">
          <p className="analysis__btn--txt">WEATHER</p>
        </button>
      </div>
      <button className='back__btn' onClick={() => navigate(-1)}>
        <BackBtn />
      </button>
      {demographicsSelected && (
        <button
          className='summary__btn'
          onClick={() => navigate("/demographics", { state: { apiData } })}
        >
          <SummaryBtn />
        </button>
      )}
    </div>
  )
}

export default Analysis

import React, { useState } from "react";
import Header from "../Components/Header";
import { ReactComponent as TakeTestIcon } from "../Buttons/Take-test.svg";
import { ReactComponent as DiscoverAIcon } from "../Buttons/Discover-AI.svg";
import { useNavigate } from "react-router"; 

function Home() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate(); 

  return (
    <div>
      <Header />
      <div className="main-center">
        <div className="title__container">
          <div
            className={`title__row ${
              hovered === "left"
                ? "move-right"
                : hovered === "right"
                ? "move-left"
                : ""
            }`}
          >
            <h1 className="main__heading">Sophisticated</h1>
            <h1 className="sub__heading">skincare</h1>
          </div>
        </div>
        <div className="home-btns-row">
          <div
            className={`left__container ${
              hovered === "right" ? "fade-out" : ""
            }`}
          >
            <div className="diamond diamond--left"></div>
            <button
              className="diamond-btn btn--left"
              onMouseEnter={() => setHovered("left")}
              onMouseLeave={() => setHovered(null)}
            >
              <DiscoverAIcon />
            </button>
          </div>
          <div
            className={`right__container ${
              hovered === "left" ? "fade-out" : ""
            }`}
          >
            <div className="diamond diamond--right"></div>
            <button
              className="diamond-btn btn--right"
              onMouseEnter={() => setHovered("right")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate("/test")}
            >
              <TakeTestIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

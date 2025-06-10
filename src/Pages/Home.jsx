import React from "react";
import Header from "../Components/Header";

function Home() {
  return (
    <div>
      <Header />
      <div className="main-center">
        <div className="title__container">
          <div className="title__row">
            <h1 className="main__heading">Sophisticated</h1>
            <h1 className="sub__heading">skincare</h1>
          </div>
        </div>
      </div>
      <div className="diamond diamond--left"></div>
      <div className="diamond diamond--right"></div>
    </div>
  );
}

export default Home;

import React, { useRef, useState } from 'react'
import Header from '../Components/Header'
import { ReactComponent as BackBtn } from "../Buttons/Back.svg";
import { ReactComponent as Gallery } from "../SVG/gallery.svg";
import { ReactComponent as Camera } from "../SVG/camera.svg";
import { ReactComponent as Preparing } from "../SVG/preparing.svg";
import { useNavigate } from "react-router";

function Choice() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); 
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1]; 
        try {
          const response = await fetch(
            "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ image: base64String }),
            }
          );
          const data = await response.json();
          console.log("API response:", data);
          navigate("/analysis", { state: { apiData: data } }); 
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setLoading(false); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header />
      <h2 className="sub__title">TO START ANALYSIS</h2>
      <button className='back__btn' onClick={() => navigate(-1)}>
        <BackBtn />
      </button>
      {loading ? (
        <div className="loading__container">
          <Preparing className="loading__choice" />
          <p className="loading__text">PREPARING YOUR ANALYSIS ...</p>
        </div>
      ) : (
        <div className="choice__btns-container">
          <button className='gallery__btn' onClick={handleGalleryClick}>
            <Gallery />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button className='camera__btn' onClick={handleCameraClick}>
            <Camera />
          </button>
          <input
            type="file"
            ref={cameraInputRef}
            style={{ display: "none" }}
            accept="image/*"
            capture="user" 
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  )
}

export default Choice

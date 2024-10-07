import React, { useRef, useState } from "react";

import "./Player.scss";
import { useRadio } from "../hooks/useRadio";

const Player = (props) => {
  const audioRef = useRef();
  const { radioStations } = useRadio();
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying((playing) => !playing);
  };

  const nextStation = () => {
    if (currentStationIndex < radioStations.length - 1) {
      setCurrentStationIndex((current) => current + 1);
    } else {
      setCurrentStationIndex(0);
    }
  };

  const prevStation = () => {
    if (currentStationIndex > 0) {
      setCurrentStationIndex((current) => current - 1);
    } else {
      setCurrentStationIndex(radioStations.length - 1);
    }
  };

  return (
    <div className="player">
      {radioStations && radioStations.length > 0 ? (
        <>
          <p className="player__station-name">{radioStations[currentStationIndex].name}</p>
          <audio
            autoPlay={currentStationIndex > 0}
            src={radioStations[currentStationIndex].url}
            ref={audioRef}
            className="player__audio"
            onEnded={nextStation}
          ></audio>
          <div className="player__nav ">
            <button
              onClick={prevStation}
              className="player__button-prev"
              aria-label="Перейти до попередньої станції"
            >
              назад
            </button>
            <input type="range" className="player__volume-slider" />
            <button
              onClick={nextStation}
              className="player__button-next"
              aria-label="Перейти до наступної станції"
            >
              вперед
            </button>
          </div>

          <button onClick={togglePlay} className="player__toggle">
            {isPlaying ? "плей" : "пауза"}
          </button>
        </>
      ) : (
        <p>Loading stations...</p> // Повідомлення, якщо станції ще не завантажилися
      )}
    </div>
  );
};

export default Player;

import React, { useRef, useState } from "react";

import "./Player.scss";
import { useRadio } from "../hooks/useRadio";

const Player = (props) => {
  const audioRef = useRef();
  const { radioStations, stationIndex, setStationIndex } = useRadio();

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
    if (stationIndex < radioStations.length - 1) {
      setStationIndex((current) => current + 1);
    } else {
      setStationIndex(0);
    }
  };

  const prevStation = () => {
    if (stationIndex > 0) {
      setStationIndex((current) => current - 1);
    } else {
      setStationIndex(radioStations.length - 1);
    }
  };

  return (
    <div className="player">
      {radioStations && radioStations.length > 0 ? (
        <>
          {radioStations[stationIndex].url && (
            <img src={radioStations[stationIndex].favicon} alt="" />
          )}

          <p className="player__station-name">
            {radioStations[stationIndex].name}
          </p>
          <audio
            autoPlay={stationIndex > 0}
            src={radioStations[stationIndex].url}
            ref={audioRef}
            className="player__audio"
            
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

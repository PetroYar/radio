import React, { useRef, useState } from "react";
import { formatTime } from "../utils/formatedTime";
import "./Player.scss";
import { useRadio } from "../hooks/useRadio";
import prev from "../icon/prevArrow.svg";
import next from "../icon/nextArrow.svg";
import iconPlay from "../icon/play.svg";
import iconStop from "../icon/stop.svg";
import random from "../icon/random.svg";
import iconVolume from "../icon/volume.svg";
const Player = (props) => {
  const audioRef = useRef();
  const {  radioStations, stationIndex, setStationIndex } =
    useRadio();
  const [currentTime, setCurrentTime] = useState(0);


  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
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
  const handleVolumeChange = (event) => {
    const volume = event.target.value / 100;
    audioRef.current.volume = volume;
  };
  const play = () => {
    audioRef.current.play();
    
  };
  const stop = () => {
    audioRef.current.pause();
  };
  const playRandomStation = () => {
    const randomNum = Math.floor(Math.random() * radioStations.length);
    setStationIndex(randomNum)
  };
 
  return (
    <div className="player">
      {radioStations && radioStations.length > 0 ? (
        <>
          <button onClick={playRandomStation} className="player__random">
            <img src={random} alt="icon stir" />
          </button>
          <button
            onClick={prevStation}
            className="player__button-prev"
            aria-label="Перейти до попередньої станції"
          >
            <img src={prev} alt="prev arrow" />
          </button>
          <audio
            autoPlay={stationIndex > 0}
            src={radioStations[stationIndex].url}
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
         
            className="player__audio"
          ></audio>
          <button className="player__stop" onClick={stop}>
            <img src={iconStop} alt="stop" />
          </button>
          <button onClick={play}>
            <img src={iconPlay} alt="play" />
          </button>
          <button
            onClick={nextStation}
            className="player__button-next"
            aria-label="Перейти до наступної станції"
          >
            <img src={next} alt="next arrow" />
          </button>

          <div className="player__nav "></div>
          <div className="player__range-slider range-slider">
            <span className=" range-slider__time">{formatTime(currentTime)}</span>
           
          </div>
          <p className="player__station-name">
            {radioStations[stationIndex].name
              .replace(
                / - \d+kb\/s|\s+\d+(\.\d+)?FM|\s+\(\d+\s+kбіт\/с\)|\s+\d+\.\d+/g,
                ""
              )
              .trim()}
          </p>
          <div className="player__volume-slider">
            <img src={iconVolume} alt="volume" />
            <input
              onChange={handleVolumeChange}
              type="range"
              min="0"
              step="0.01"
            />
          </div>

          {/* {radioStations[stationIndex].url ? (
            <img className="test-img" src={radioStations[stationIndex].favicon} alt="" />
          ): <p>nema</p>} */}
        </>
      ) : (
        <p>Loading stations...</p> // Повідомлення, якщо станції ще не завантажилися
      )}
    </div>
  );
};

export default Player;

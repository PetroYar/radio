import React, { useRef, useState, useEffect } from "react";
import { formatTime } from "../utils/formatedTime";
import "./Player.scss";
import { useRadio } from "../hooks/useRadio";
import prev from "../icon/prevArrow.svg";
import next from "../icon/nextArrow.svg";
import iconPlay from "../icon/play.svg";
import iconStop from "../icon/stop.svg";
import random from "../icon/random.svg";
import iconVolume from "../icon/volume.svg";
import radioIcon from "../icon/radioIcon.png";
import { useAdaptive } from "../hooks/useAdaptive";

const Player = (props) => {
  const {
    audioRef,
    stationIndex,
    setStationIndex,
    stationView,
    historyStation,
    addHistory,
    
  } = useRadio();
  const {isMobile,} = useAdaptive()
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackStatus, setPlaybackStatus] = useState(false);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  const nextStation = () => {
    play();
    if (stationIndex < stationView.length - 1) {
      setStationIndex((current) => current + 1);
    } else {
      setStationIndex(0);
    }
  };

  const prevStation = () => {
    play();

    if (stationIndex > 0) {
      setStationIndex((current) => current - 1);
    } else {
      setStationIndex(stationView.length - 1);
    }
  };
   if (!isMobile) {
   audioRef.current.volume = 1;
   
   
   }
  const handleVolumeChange = (event) => {
   let volume = event.target.value / 100;

   

   audioRef.current.volume = volume;
    
  };
  
  const play = () => {
    audioRef.current.play();
    setPlaybackStatus(true);
    if (stationView !== historyStation) {
      addHistory();
    }
  };

  const stop = () => {
    audioRef.current.pause();
    setPlaybackStatus(false);
  };
  const playRandomStation = () => {
    const randomNum = Math.floor(Math.random() * stationView.length);
    setStationIndex(randomNum);
  };

  return (
    <div className="player">
      {stationView && stationView.length > 0 ? (
        <>
        
          <div className="player__buttons">
            <button onClick={playRandomStation} className="player__random">
              <img src={random} alt="icon stir" />
            </button>
            <button onClick={prevStation} className="player__button-prev">
              <img src={prev} alt="prev arrow" />
            </button>
            <audio
              autoPlay={stationIndex > 0}
              src={stationView[stationIndex].url}
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              className="player__audio"
            ></audio>
            <button
              className={`player__stop ${!playbackStatus ? "playing" : ""}`}
              onClick={stop}
            >
              <img src={iconStop} alt="stop" />
            </button>
            <button
              onClick={play}
              className={`player__play ${playbackStatus ? "playing" : ""}`}
            >
              <img src={iconPlay} alt="play" />
            </button>
            <button
              onClick={nextStation}
              className="player__button-next"
              aria-label="Перейти до наступної станції"
            >
              <img src={next} alt="next arrow" />
            </button>
          </div>

          <span className="time">{formatTime(currentTime)}</span>
         
            <p className="player__station-name">
              {stationView[stationIndex].name
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

          {stationView[stationIndex].favicon ? (
            <img
              className="player__img"
              src={stationView[stationIndex].favicon}
              alt="icon station"
            />
          ) : (
            <img className="player__img" src={radioIcon} alt="radio" />
          )}
        </>
      ) : (
        <p>Loading stations...</p> // Повідомлення, якщо станції ще не завантажилися
      )}
    </div>
  );
};

export default Player;

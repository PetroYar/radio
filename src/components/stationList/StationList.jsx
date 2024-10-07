import React from "react";

import "./StationList.scss";
import { useRadio } from "../hooks/useRadio";

const StationList = (props) => {
  const { radioStations, setStationIndex,stationIndex } = useRadio();
  const selectStationByIndex = (index) => {
    setStationIndex(index);
  };
  return (
    <ul className="station-list ">
      {radioStations && radioStations.length > 0 ? (
        radioStations.map((el, ind) => {
          return (
            <li className={`station-list__item ${stationIndex === ind ? 'station-list__item--active' : '' }`} key={ind}>
              <button
                onClick={() => selectStationByIndex(ind)}
                className="station-list__item-button"
              >
                {el.name}
              </button>
              <button
              // className={`station__item-like-button ${
              //   isLiked ? "station__item-like-button--active" : ""
              // }`}
              >
                Like
              </button>
            </li>
          );
        })
      ) : (
        <p>Почекайте, будь ласка...</p>
      )}
    </ul>
  );
};

export default StationList;

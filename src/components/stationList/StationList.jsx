import React from "react";

import "./StationList.scss";
import { useRadio } from "../hooks/useRadio";

const StationList = (props) => {
  const {
    radioStations,
    setStationIndex,
    stationIndex,
    setStationToFavorites,
  } = useRadio();
  const selectStationByIndex = (index) => {
    setStationIndex(index);
  };
const addStationToFavorites = (station) => {
  setStationToFavorites((favorites) => {
  
    if (!favorites.some((fav) => fav.changeuuid === station.changeuuid)) {
      return [...favorites, station];
    }
    return favorites; 
  });
};

  return (
    <ul className="station-list ">
      {radioStations && radioStations.length > 0 ? (
        radioStations.map((el, ind) => {
          return (
            <li
              className={`station-list__item ${
                stationIndex === ind ? "station-list__item--active" : ""
              }`}
              key={ind}
            >
              <button
                onClick={() => selectStationByIndex(ind)}
                className="station-list__item-button"
              >
                {el.name}
              </button>
              <button onClick={() => addStationToFavorites(el)}>
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

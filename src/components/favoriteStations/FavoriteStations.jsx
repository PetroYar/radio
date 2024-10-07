import React from "react";

import "./FavoriteStations.scss";
import { useRadio } from "../hooks/useRadio";

const FavoriteStations = (props) => {
  const { stationToFavorites } = useRadio();
  return (
    <ul className="favorite-stations">
      {stationToFavorites && stationToFavorites.length > 0 ? (
        stationToFavorites.map((station) => {
          return (
            <li className="favorite-stations__station" key={station.changeuuid}>
              {station.name}
            </li>
          );
        })
      ) : (
        <p>немає улюблених</p>
      )}
    </ul>
  );
};

export default FavoriteStations;

import React from "react";

import "./FavoriteStations.scss";
import { useRadio } from "../hooks/useRadio";

const FavoriteStations = (props) => {
  const { stationToFavorites } = useRadio();
  console.log(stationToFavorites)
  return (
    <ul className="favorite-stations">
      {stationToFavorites && stationToFavorites.length > 0 ? (
        stationToFavorites.map((station,ind) => {
          return (
            <li className="favorite-stations__station" key={ind}>
              {station.stationName}
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

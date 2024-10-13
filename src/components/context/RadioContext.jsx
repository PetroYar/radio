import { createContext, useEffect, useState } from "react";

import { fetchRadioStations } from "../utils/api";

const RadioContext = createContext();

const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await fetchRadioStations(20);
        const filteredStations = stations.filter((station) => {
          const isSupportedCodec = station.codec.toLowerCase() === "mp3"; // Або інший підтримуваний кодек
          return isSupportedCodec;
        });
        console.log(filteredStations);
        setRadioStations(filteredStations);
      } catch (error) {
        console.error("Error ");
      }
    };

    fetchStations();
  }, []);
  const valueCTX = {
    radioStations,
    stationIndex,
    setStationIndex,
    setStationToFavorites,
    stationToFavorites,
    language,
    setLanguage,
  };
  return (
    <RadioContext.Provider value={valueCTX}>{children}</RadioContext.Provider>
  );
};

export { RadioProvider, RadioContext };

import { createContext, useEffect, useState } from "react";

import { RadioBrowserApi } from "radio-browser-api";

const api = new RadioBrowserApi("My Radio App", true);

const RadioContext = createContext();

const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await api.searchStations({
          countryCode: "ua",
        });

        console.log(stations);
        return stations;
      } catch (error) {
        console.error("Error fetching stations:", error);
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

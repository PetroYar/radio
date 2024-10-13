import { createContext, useEffect, useState } from "react";

// import { RadioBrowserApi, StationSearchType } from "radio-browser-api";
import { fetchRadioStations } from "../utils/api";

// const api = new RadioBrowserApi(
//   "My Radio App",
//   "https://de1.api.radio-browser.info/"
// );

const RadioContext = createContext();

const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  const [language, setLanguage] = useState("en");

  // useEffect(() => {
  //   const fetchStations = async () => {
  //     try {
  //       const stations = await api.searchStations({
  //         countryCode: "ua",
  //         limit: 5,
  //       });

  //       setRadioStations(stations);
  //     } catch (error) {
  //       console.error("Error fetching stations:", error);
  //     }
  //   };

  //   fetchStations();
  // }, []);
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await fetchRadioStations(20); // Pass the limit here
        setRadioStations(stations);
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

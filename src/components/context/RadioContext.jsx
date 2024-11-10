import { createContext, useEffect, useState, useRef } from "react";

import { fetchRadioStations } from "../utils/api";

const RadioContext = createContext();
import { messagesError } from "../config/translations";
const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  const [language, setLanguage] = useState("en");
  const audioRef = useRef();
  const [filteredGenre, setFilteredGenre] = useState("");
  const [filteredCountry, setFilteredCountry] = useState("");
  const [historyStation, setHistoryStation] = useState([]);
  const [stationView, setStationView] = useState([]);
  const [massage, setMassage] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (stationView === historyStation) {
      setMassage(messagesError[language].noStations);
    } else if (stationView == stationToFavorites) {
      setMassage(messagesError[language].loginFirst);
    } else {
      setMassage(messagesError[language].loading);
    }
  }, [stationView, language]);
  useEffect(() => {
    setStationView(radioStations);
  }, [radioStations]);
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await fetchRadioStations(
          filteredCountry,
          filteredGenre,
          ""
        );
        const filteredStations = stations.filter((station) => {
          const isSupportedCodec = station.codec.toLowerCase() === "mp3";
          return isSupportedCodec;
        });

        setRadioStations(filteredStations);
      } catch (error) {
        console.error("Error ");
      }
    };

    fetchStations();
  }, [filteredGenre, filteredCountry]);

  const switchStationView = (stations) => {
    setStationIndex(0);
    if (stations === "favorite") {
      setStationView(stationToFavorites);
    } else if (stations === "home") {
      setStationView(radioStations);
    } else {
      setStationView(historyStation);
    }
  };
  const addHistory = () => {
    const stationExists = historyStation.some(
      (station) => station.changeuuid === stationView[stationIndex].changeuuid
    );

    if (!stationExists) {
      setHistoryStation((stations) => [...stations, stationView[stationIndex]]);
    }
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); 
    console.log(33)
  };

  const inputHandleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = radioStations.filter((station) =>
      station.name.toLowerCase().includes(value.toLowerCase())
    );

    setStationView(filtered);
  };

  const valueCTX = {
    radioStations,
    stationIndex,
    setStationIndex,
    setStationToFavorites,
    stationToFavorites,
    language,
    setLanguage,
    audioRef,
    setFilteredGenre,

    filteredGenre,

    switchStationView,
    stationView,
    historyStation,
    setHistoryStation,
    massage,
    addHistory,
    handleLanguageChange,
    inputHandleChange,
    inputValue,
    filteredCountry,
    setFilteredCountry,
  };
  return (
    <RadioContext.Provider value={valueCTX}>{children}</RadioContext.Provider>
  );
};

export { RadioProvider, RadioContext };

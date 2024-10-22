import { createContext, useEffect, useState, useRef } from "react";

import { fetchRadioStations } from "../utils/api";
import { app } from "../firebase";
const RadioContext = createContext();
import { getAuth } from "firebase/auth";
import { messagesError } from "../config/translations";
const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  const [language, setLanguage] = useState("en");
  const audioRef = useRef();
  const [test, setTest] = useState("");
  const [test1, setTest1] = useState("");
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [historyStation, setHistoryStation] = useState([]);
  const [stationView, setStationView] = useState();
  const [massage, setMassage] = useState("");

  useEffect(() => {
    if (stationView === historyStation) {
      setMassage(messagesError[language].noStations);
    } else if (stationView == stationToFavorites) {
      setMassage(messagesError[language].loginFirst);
    } else {
      setMassage(messagesError[language].loading);
      
    }
  }, [stationView,language]);
  useEffect(() => {
    setStationView(radioStations);
  }, [radioStations]);
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await fetchRadioStations(test1, test, "trtr");
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
  }, [test, test1]);

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
   setLanguage(event.target.value); // Оновлюємо стан на основі обраного значення
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
    setTest,
    setTest1,
    test,
    test1,
    // user,setUser,auth
    switchStationView,
    stationView,
    historyStation,
    setHistoryStation,
    massage,
    addHistory,
    handleLanguageChange
  };
  return (
    <RadioContext.Provider value={valueCTX}>{children}</RadioContext.Provider>
  );
};

export { RadioProvider, RadioContext };

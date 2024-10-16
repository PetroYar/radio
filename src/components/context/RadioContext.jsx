import { createContext, useEffect, useState , useRef} from "react";

import { fetchRadioStations } from "../utils/api";

const RadioContext = createContext();

const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  const [language, setLanguage] = useState("en");
  const audioRef = useRef();
  const [test,setTest] = useState('')
  const [test1,setTest1] = useState('')
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stations = await fetchRadioStations(test1,test,'trtr');
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
  }, [test,test1]);


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
  };
  return (
    <RadioContext.Provider value={valueCTX}>{children}</RadioContext.Provider>
  );
};

export { RadioProvider, RadioContext };

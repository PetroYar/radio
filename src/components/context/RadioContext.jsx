import { createContext, useEffect, useState } from "react";
import { fetchRadioStations } from "../utils/api";

const RadioContext = createContext();

const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState([]);
  const [stationIndex, setStationIndex] = useState(0);
  const [stationToFavorites, setStationToFavorites] = useState([]);
  useEffect(() => {
    const getStation = async () => {
      try {
        const data = await fetchRadioStations();

        const uaStation = data.filter((el) =>
          el.country.toLowerCase().includes("ukraine") && el.name.toLowerCase().includes('1')
        );
        // const testt = data.filter(el=>el.votes > 300)
        // console.log(testt.length)
      
        const test = uaStation.filter((el) => {
          return el.votes > 450;
        });
        console.log(test)
        setRadioStations(test);
      } catch (error) {
        console.log(`error`, error);
      }
    };
    getStation();
  }, []);
  

  const valueCTX = {
    radioStations,
    stationIndex,
    setStationIndex,
    setStationToFavorites,
    stationToFavorites,
  };
  return (
    <RadioContext.Provider value={valueCTX}>{children}</RadioContext.Provider>
  );
};

export { RadioProvider, RadioContext };

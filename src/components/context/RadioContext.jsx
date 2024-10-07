import { createContext,  useEffect, useState } from "react";
import { fetchRadioStations } from "../utils/api";

const RadioContext = createContext();

const RadioProvider = ({ children }) => {
  const [radioStations, setRadioStations] = useState();

  useEffect(() => {
    const getStation = async () => {
      try {
        const data = await fetchRadioStations();

        const uaStation = data.filter((el) =>
          el.name.toLowerCase().includes("ukraine")
        );
        setRadioStations(uaStation);
      } catch (error) {
        console.log(`error`, error);
      }
    };
    getStation();
  }, []);

  const valueCTX = {
    radioStations,
  };
  return (
    <RadioContext.Provider value={valueCTX}>{children}</RadioContext.Provider>
  );
};

export { RadioProvider, RadioContext };

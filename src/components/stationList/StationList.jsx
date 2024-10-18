import React, { useEffect } from "react";

import "./StationList.scss";
import { useRadio } from "../hooks/useRadio";
import { database } from "../firebase";
import { ref, push, get, child, remove,onValue,off} from "firebase/database";
import useAuth from "../hooks/useAuth";
import FavoriteStations from "../favoriteStations/FavoriteStations";

const StationList = (props) => {
  const {
    radioStations,
    setStationIndex,
    stationIndex,
    setStationToFavorites,
    stationToFavorites,
  } = useRadio();
  const { user } = useAuth();
  const selectStationByIndex = (index) => {
    setStationIndex(index);
  };
  const addStationToFavorites = async (station) => {
    if (user) {
      try {
        const db = database;
        const dbRef = ref(db, `users/${user.uid}/favoriteStation`);

        await push(dbRef, {
          stationName: station.name,
          stationUrl: station.url,
        });
        console.log("added");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not user");
    }
  };
useEffect(() => {
  const db = database;

  // Перевіряємо, чи існує user перед доступом до uid
  if (!user) {
    console.log("Користувач не авторизований.");
    return; // Виходимо з ефекту, якщо user є null
  }

  const dbRef = ref(db, `users/${user.uid}/favoriteStation`);

  const loadStations = () => {
    // Слухач змін у реальному часі
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const stations = Object.values(snapshot.val());
          setStationToFavorites(stations);
         
        } else {
          setStationToFavorites([]); // Якщо немає станцій, очищуємо список
         
        }
      },
      (error) => {
        console.log(`loadStation ${error}`);
      }
    );
  };

  loadStations();

  // Очистка слухача при відмонтовані компонента
  return () => {
    off(dbRef); // Вимикаємо слухач, щоб уникнути витоків пам'яті
  };
}, [user]);



  const checkIfStationExists = async (station) => {
    const db = database;
    const dbRef = ref(db, `users/${user.uid}/favoriteStation`);
    const existingStationsSnapshot = await get(dbRef);
    const existingStations = existingStationsSnapshot.val() || {};
    const stationKey = Object.keys(existingStations).find(
      (key) => existingStations[key].stationName === station.name
    );
    if (stationKey) {
      removeStationToFavorites(stationKey);
    } else {
      addStationToFavorites(station);
      console.log("add");
    }
  };
  const removeStationToFavorites = async (stationKey) => {
    try {
      const db = database;
      const dbRef = ref(db, `users/${user.uid}/favoriteStation/${stationKey}`);
      await remove(dbRef);
      console.log("Станцію видалено");
    } catch (error) {
      console.error("Помилка видалення станції:", error);
    }
  };
  return (
    <ul className="station-list ">
      {radioStations && radioStations.length > 0 ? (
        radioStations.map((el, ind) => {
          return (
            <li
              className={`station-list__item ${
                stationIndex === ind ? "station-list__item--active" : ""
              }`}
              key={ind}
            >
              <button
                onClick={() => selectStationByIndex(ind)}
                className="station-list__item-button"
              >
                {el.name
                  .replace(
                    / - \d+kb\/s|\s+\d+(\.\d+)?FM|\s+\(\d+\s+kбіт\/с\)|\s+\d+\.\d+/g,
                    ""
                  )
                  .trim()}
              </button>
              <button onClick={() => checkIfStationExists(el)}>Like</button>
            </li>
          );
        })
      ) : (
        <p>Почекайте, будь ласка...</p>
      )}
    </ul>
  );
};

export default StationList;

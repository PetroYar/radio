import React, { useEffect } from "react";

import "./StationList.scss";
import { useRadio } from "../hooks/useRadio";
import { database } from "../firebase";
import { ref, push, get, remove, onValue, off } from "firebase/database";
import useAuth from "../hooks/useAuth";
import radioIcon from "../icon/radioIcon.png";

const StationList = () => {
  const {
    setStationIndex,
    stationIndex,
    setStationToFavorites,
    stationToFavorites,
    massage,
   stationView,
    addHistory,
  } = useRadio();
  const { user } = useAuth();
  const selectStationByIndex = (index) => {
    setStationIndex(index);
    addHistory();
  };

  const addStationToFavorites = async (station) => {
    if (user) {
      try {
        const db = database;
        const dbRef = ref(db, `users/${user.uid}/favoriteStation`);

        await push(dbRef, {
          name: station.name,
          url: station.url,
          favicon: station.favicon,
        });
        console.log("станцію додано");
        console.log(station);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not user");
    }
  };
  const loadStations = () => {
    const db = database;

    // Перевіряємо, чи існує user перед доступом до uid
    if (!user) {
      return; // Виходимо з ефекту, якщо user є null
    }

    const dbRef = ref(db, `users/${user.uid}/favoriteStation`);
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
    return () => {
      off(dbRef); // Вимикаємо слухач, щоб уникнути витоків пам'яті
    };
  };
  useEffect(() => {
    loadStations();

  }, [user, stationView]);

  const checkIfStationExists = async (station) => {
    const db = database;
    const dbRef = ref(db, `users/${user.uid}/favoriteStation`);
    const existingStationsSnapshot = await get(dbRef);
    const existingStations = existingStationsSnapshot.val() || {};
    const stationKey = Object.keys(existingStations).find(
      (key) => existingStations[key].name === station.name
    );
    if (stationKey) {
      console.log("Станція існує, видаляємо:", stationKey);
      await removeStationToFavorites(stationKey);
    } else {
      console.log("Станція не існує, додаємо:", station);
      await addStationToFavorites(station);
    }
  };

  const removeStationToFavorites = async (stationKey) => {
    try {
      const db = database;
      const dbRef = ref(db, `users/${user.uid}/favoriteStation/${stationKey}`);
      await remove(dbRef);
      console.log("Станцію видалено");
      loadStations();
    } catch (error) {
      console.error("Помилка видалення станції:", error);
    }
  };
  return (
    <ul className="station-list ">
      {stationView && stationView.length > 0 ? (
        stationView.map((el, ind) => {
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
                {el.favicon ? (
                  <img src={el.favicon} alt={el.name} />
                ) : (
                  <img src={radioIcon} alt="radio" />
                )}
                <p>
                  {el.name
                    .replace(
                      / - \d+kb\/s|\s+\d+(\.\d+)?FM|\s+\(\d+\s+kбіт\/с\)|\s+\d+\.\d+/g,
                      ""
                    )
                    .trim()}
                </p>
              </button>
              <button
                className={`station-list__favorites ${
                  stationIndex === ind ? "station-list__favorite--active" : ""
                } ${
                  stationToFavorites.some((fav) => fav.name === el.name)
                    ? "favorite"
                    : ""
                }`}
                onClick={() => checkIfStationExists(el)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </li>
          );
        })
      ) : (
        <p>{massage}</p>
      )}
    </ul>
  );
};

export default StationList;

// import { RadioBrowserApi, StationSearchType } from "radio-browser-api";

// const api = new RadioBrowserApi("My Radio App");

// export const fetchStationss = async () => {
//   try {
//     // Отримання станцій за тегом "jazz"
//     const stations = await api.searchStations({
//       // tagList: ["raggae"],
//       countryCode: "Ua",
      
//     });

//     console.log(stations);
//     return stations
//   } catch (error) {
//     console.error("Error fetching stations:", error);
//   }
// };




export const RADIO_API_URL = "https://de1.api.radio-browser.info/json/stations";

export const fetchRadioStations = async (limit) => {
  try {
      const url = limit ? `${RADIO_API_URL}?limit=${limit}` : RADIO_API_URL;
      const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error status ${response.status}`);
    }
    const stationsData = await response.json();
    return stationsData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const fetchStations = async () => {
  try {
    const params = new URLSearchParams({
      // by: "tag", // Пошук за тегом
      // country: 'ukraine',
      tag: "reggae", // Фільтруємо за жанром
      limit: 500, // Отримуємо до 100 станцій
    });

    const response = await fetch(
      `https://de1.api.radio-browser.info/json/stations?${params}`,
      {
        mode: "cors",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching radio stations:", error);
  }
};

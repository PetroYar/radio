// export const RADIO_API_URL =
//   "https://at1.api.radio-browser.info/json/stations/bytag/reggae?limit=5000";

// export const fetchRadioStations = async () => {
//   try {
//       const url = `${RADIO_API_URL}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Error status ${response.status}`);
//       }
//       const stationsData = await response.json();

//     return stationsData;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

export const fetchRadioStations = async ( country, tag, top ) => {
  try {
    // Створюємо URL з фільтрами
    let url = `https://at1.api.radio-browser.info/json/stations`;

    // Додаємо фільтр за країною, якщо він заданий
    if (country !== '') {
      url += `/bycountry/${country}`;
    }

    // Додаємо фільтр за тегом, якщо він заданий
    if (tag !== '') {
      url += `/bytag/${tag}`;
    }
    url += '?limit=3000'
console.log(url)
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

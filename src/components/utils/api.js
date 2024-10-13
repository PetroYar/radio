

export const RADIO_API_URL =
  "http://at1.api.radio-browser.info/json/stations/bylanguage/ukrainian";

export const fetchRadioStations = async () => {
  try {
      const url = `${RADIO_API_URL}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      const stationsData = await response.json();
      console.log(stationsData)
    return stationsData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

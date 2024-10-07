const RADIO_API_URL = "https://de1.api.radio-browser.info/json/stations";

export const fetchRadioStations = async () => {
  try {
    const response = await fetch(RADIO_API_URL);
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

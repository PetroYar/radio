export const fetchRadioStations = async (country, tag, top) => {
  try {
    let url = `https://at1.api.radio-browser.info/json/stations`;

    if (country !== "") {
      url += `/bycountry/${country}`;
    } else if (tag !== "") {
      url += `/bytag/${tag}`;
    }
    url += "?limit=500";

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

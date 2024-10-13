// import React, { useEffect, useState } from "react";

// const RadioStations = () => {
//   const [stations, setStations] = useState([]);

//   useEffect(() => {
//     const fetchStations = async () => {
//       try {
//         const params = new URLSearchParams({
          
//           country: "ukraine",
//           limit: 5,
//         });

//         const response = await fetch(
//           `https://de1.api.radio-browser.info/json/stations?${params}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStations(data);
//         console.log(data)
//       } catch (error) {
//         console.error("Error fetching radio stations:", error);
//       }
//     };

//     fetchStations();
//   }, []);

//   return (
//     <div>
//       <h2>Top Radio Stations</h2>
//       <ul>
//         {stations.map((station) => (
//           <li key={station.stationuuid}>
//             {station.name} - {station.votes} votes
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RadioStations;

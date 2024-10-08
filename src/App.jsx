import "./App.scss";
import { RadioProvider } from "./components/context/RadioContext";
import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";

function App() {
 
  return (
    <div className="app">
      <RadioProvider>
        <div className="test">
        <StationList/>
        <FavoriteStations/>  
        </div>
        
         <Player/>
      </RadioProvider>
    </div>
  );
}

export default App;

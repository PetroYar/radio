import "./App.scss";
import { RadioProvider } from "./components/context/RadioContext";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";

function App() {
  return (
    <div className="app">
      <RadioProvider>
        <StationList/>
         <Player/>
      </RadioProvider>
    </div>
  );
}

export default App;

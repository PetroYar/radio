import { useState } from "react";
import "./App.scss";
import { RadioProvider } from "./components/context/RadioContext";
import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import FilterPanel from "./components/filterPanel/FilterPanel";
import AudioVisualizer from "./components/audioVisualizer/AudioVisualizer";
import { useRadio } from "./components/hooks/useRadio";

function App() {
  const { radioStations } = useRadio();
  return (
    <>
      {radioStations && radioStations.length > 0 ? (
        <div className="app">
          <Aside />
          <div className="content">
            <Header />
            <main className="main">
              <div className="test">
                <StationList />

                <AudioVisualizer />
              </div>
              <FilterPanel />
              {/* <FavoriteStations /> */}
            </main>
            <Player />
          </div>
        </div>
      ) : (
        <p>ds</p>
      )}
    </>
  );
}

export default App;

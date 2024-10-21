import "./App.scss";

// import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import FilterPanel from "./components/filterPanel/FilterPanel";

import { useRadio } from "./components/hooks/useRadio";
import AudioVisualize from "./components/AudioVisualizer";
import { useRef, useEffect } from "react";
import { AdaptiveProvider } from "./components/context/AdaptiveContext";

function App() {
  const { audioRef, user } = useRadio();

  return (
    <>
      {/* {radioStations && radioStations.length > 0 ? ( */}
      <AdaptiveProvider>
        <div className="app">
          <Aside />
          <div className="content">
            <Header />
            <main className="main">
              <div className="test">
                <StationList />
                {/* <AudioVisualize audioRef={audioRef} /> */}
              </div>
              <FilterPanel />
            </main>

            <Player />
          </div>
        </div>
      </AdaptiveProvider>
      {/* ) : (
        <p>ds</p>
      )} */}
    </>
  );
}

export default App;

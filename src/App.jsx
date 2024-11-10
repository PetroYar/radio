import "./App.scss";

// import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import FilterPanel from "./components/filterPanel/FilterPanel";

import { useRadio } from "./components/hooks/useRadio";

import { useAdaptive } from "./components/hooks/useAdaptive";

function App() {
  const { stationToFavorites } = useRadio();
  const { isMobile } = useAdaptive();
 
  return (
    <>
      {/* {radioStations && radioStations.length > 0 ? ( */}
        <div className="app">
          <Aside />
          <div className="content">
            <Header />
            <main className="main">
              <div className="test">
                <StationList key={stationToFavorites.length} />

                {/* <AudioVisualize audioRef={audioRef} /> */}
              </div>
              {isMobile && <FilterPanel />}
            </main>

            <Player />
          </div>
        </div>
      {/* ) : (
        <p>ds</p>
      )} */}
    </>
  );
}

export default App;

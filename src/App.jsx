
import "./App.scss";

// import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import FilterPanel from "./components/filterPanel/FilterPanel";
import AudioVisualize from "./components/audioVisualizer/AudioVisualizer";
import { useRadio } from "./components/hooks/useRadio";
import AuthProvider from "./components/auth";

function App() {
  const { audioRef } = useRadio();
  return (
    <>
      {/* {radioStations && radioStations.length > 0 ? ( */}
        <div className="app">
          <Aside />
          <div className="content">
            <Header />
            <main className="main">
              <div className="test">
                <StationList />

          <AuthProvider/>
            {audioRef.current?  <AudioVisualize /> : <p>dd</p>}
              </div>
              <FilterPanel />
              {/* <FavoriteStations /> */}
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

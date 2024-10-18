import "./App.scss";

// import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import FilterPanel from "./components/filterPanel/FilterPanel";
import AudioVisualize from "./components/audioVisualizer/AudioVisualizer";
import { useRadio } from "./components/hooks/useRadio";
import { get, ref,child } from "firebase/database";
import { dbb } from "./components/firebase";
import { useState } from "react";

function App() {
  const { audioRef } = useRadio();
const [tests,setTEsts] = useState()



  const testAwait = async () => {
    try {
      const db = dbb;
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "users"));
      if (snapshot.exists()) {
        setTEsts(snapshot.val())
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(tests)
  return (
    <>
      {/* {radioStations && radioStations.length > 0 ? ( */}
      <div className="app">
        <Aside />
        <div className="content">
          <Header />
          <button onClick={testAwait}>test </button>
          <main className="main">
            <div className="test">
              <StationList />

              {/* <AuthProvider/> */}
              {audioRef.current ? <AudioVisualize /> : <p>dd</p>}
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

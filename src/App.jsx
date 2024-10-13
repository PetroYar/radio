import { useState } from "react";
import "./App.scss";
import { RadioProvider } from "./components/context/RadioContext";
import FavoriteStations from "./components/favoriteStations/FavoriteStations";
import Player from "./components/player/Player";
import StationList from "./components/stationList/StationList";
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";


function App() {
  return (
    <div className="app">
      <RadioProvider>
        <Aside />
        <div className="content">
          <Header />
          <main className="main">
            <StationList />
            <FavoriteStations />
          </main>
          <Player />
        
        </div>
      </RadioProvider>
    </div>
  );
}

export default App;

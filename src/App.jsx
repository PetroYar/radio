import "./App.scss";
import { RadioProvider } from "./components/context/RadioContext";
import Player from "./components/player/Player";

function App() {
  return (
    <div className="app">
      <RadioProvider>
         <Player/>
      </RadioProvider>
    </div>
  );
}

export default App;

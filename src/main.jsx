import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RadioProvider } from './components/context/RadioContext.jsx'
import {  AdaptiveProvider } from './components/context/AdaptiveContext.jsx'

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log("Service Worker зареєстровано: ", registration);
    })
    .catch((error) => {
      console.log("Помилка реєстрації Service Worker: ", error);
    });
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RadioProvider>
<AdaptiveProvider>
    <App />

</AdaptiveProvider>
    </RadioProvider>
  /* </StrictMode>, */
)

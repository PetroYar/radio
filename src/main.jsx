import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RadioProvider } from './components/context/RadioContext.jsx'
import {  AdaptiveProvider } from './components/context/AdaptiveContext.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RadioProvider>
<AdaptiveProvider>
    <App />

</AdaptiveProvider>
    </RadioProvider>
  /* </StrictMode>, */
)

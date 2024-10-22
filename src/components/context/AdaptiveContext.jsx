import { createContext } from "react";
import { useState, useEffect } from "react";
const AdaptiveContext = createContext({});

const AdaptiveProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
      setIsMobile(currentWidth > 767.98);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBurgerMenu = () => {
    setShowBurgerMenu((prev) => !prev);
  };

  const valueCTX = {
    windowWidth,
    showBurgerMenu,
    handleBurgerMenu,
    isMobile
  };
  return (
    <AdaptiveContext.Provider value={valueCTX}>
      {children}
    </AdaptiveContext.Provider>
  );
};

export { AdaptiveContext, AdaptiveProvider };

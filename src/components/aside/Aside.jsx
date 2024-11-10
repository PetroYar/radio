import React from "react";
import { translationsAside, translationsHeader } from "../config/translations";
import "./Aside.scss";
import logo from "../icon/logo.svg";
import { useRadio } from "../hooks/useRadio";
import { useAdaptive } from "../hooks/useAdaptive";
import useAuth from "../hooks/useAuth";
import globe from "../icon/Globe.svg";
import { useEffect } from "react";
const Aside = (props) => {
  const { language, switchStationView, handleLanguageChange } = useRadio();
  const { isMobile, showBurgerMenu, handleBurgerMenu } = useAdaptive();
  const { user, signInWithGoogle, signOut } = useAuth();

  const handleButtonClick = (index, ind) => {
    handleBurgerMenu();
    switch (ind) {
      case 0: // 'menu'
        if (index === 0) {
          switchStationView("home");
        }
        break;
      case 1: // 'history'
        if (index === 0) {
          switchStationView("test");
        } else if (index === 1) {
          switchStationView("favorite");
        }
        break;
      case 2: // 'share'
        if (index === 0) {
         const urlToShare = "https://radio-qcxu.vercel.app/"; // Поточне посилання на сторінку
          const quoteText = "!"; // Текст, який буде додано до допису
          
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            urlToShare
          )}&quote=${encodeURIComponent(quoteText)}`;
          window.open(facebookUrl, "_blank");
        } 
        break;
      case 3: // 'general'
        if (index === 0) {
          console.log("Settings clicked");
        } else if (index === 1) {
        }
        break;
      default:
        console.log("No action for this button");
    }
  };

  return (
    <aside className={`aside ${showBurgerMenu ? "active" : ""}`}>
      <div className="aside__container">
        {isMobile && (
          <div className="logo">
            <img src={logo} alt="logo world radio" />
          </div>
        )}
        {Object.keys(translationsAside[language].labels).map((key, ind) => (
          <div key={key}>
            <h3 className="aside__title">
              {translationsAside[language].labels[key]}
            </h3>

            <ul className="aside__list">
              {translationsAside[language][key].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleButtonClick(index, ind)}
                    className="aside__item"
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="aside__icon"
                    />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!isMobile && (
          <>
            <div className="auth">
              {user ? (
                <>
                  <p>{user.displayName}</p>
                  <button onClick={signOut}>
                    {translationsHeader[language].logout}
                  </button>
                </>
              ) : (
                <button onClick={signInWithGoogle}>
                  {translationsHeader[language].login}
                </button>
              )}
            </div>
            <div className="launge">
              <img src={globe} alt="globe" />
              <select
                name="language"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="ua">Uk</option>
                <option value="en">Eng</option>
                <option value="pl">PL</option>
              </select>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Aside;

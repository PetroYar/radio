import React from "react";

import "./Header.scss";
import { useRadio } from "../hooks/useRadio";
import globe from "../icon/Globe.svg";
import search from "../icon/search.svg";
import useAuth from "../hooks/useAuth";
import { translationsHeader } from "../config/translations";
import logo from "../icon/logo.svg";
import { useAdaptive } from "../hooks/useAdaptive";
import { popularGenres, popularMusicCountries } from "../config/constans";

const Header = (props) => {
  const {
    language,
    setLanguage,
    inputHandleChange,
    inputValue,
    setFilteredGenre,
    setFilteredCountry,
    filteredGenre,
    filteredCountry,handleLanguageChange,
  } = useRadio(); 
  const { user, signInWithGoogle, signOut, } = useAuth();
  const { handleBurgerMenu, showBurgerMenu, isMobile } = useAdaptive();

const handleClick = ()=>{
  console.log(33)
}

  return (
    <header className="header">
      <button
        onClick={() => handleBurgerMenu()}
        className={`burger ${showBurgerMenu ? "burger--active" : ""}`}
      >
        <span></span>
      </button>
      {!isMobile && (
        <>
          <div className="logo">
            <img src={logo} alt="logo world radio" />
          </div>
          <div className="header__category">
            <select
              name=""
              id=""
              value={filteredGenre}
              onChange={(e) => setFilteredGenre(e.target.value)}
            >
              <option> {translationsHeader[language].genre}</option>
              {popularGenres.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
            <select
              name=""
              id=""
              value={filteredCountry}
              onChange={(e) => setFilteredCountry(e.target.value)}
            >
              <option>{translationsHeader[language].country}</option>

              {popularMusicCountries.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
      <div className="header__input">
        <img src={search} alt="search" />
        <input
          type="text"
          onClick={handleClick}
          onChange={inputHandleChange}
          value={inputValue}
        />
      </div>
      {isMobile && (
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
    </header>
  );
};

export default Header;

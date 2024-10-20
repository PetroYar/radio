import React from "react";

import "./Header.scss";
import { useRadio } from "../hooks/useRadio";
import globe from "../icon/Globe.svg";
import search from "../icon/search.svg";
import useAuth from "../hooks/useAuth";
import { translationsHeader } from "../config/translations";

const Header = (props) => {
  const { language, setLanguage } = useRadio(); // Початкова мова — англійська
  const { user, signInWithGoogle, signOut } = useAuth();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); // Оновлюємо стан на основі обраного значення
  };
  return (
    <header className="header">
      <div className="header__input">
        <img src={search} alt="search" />
        <input type="text" />
      </div>
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
    </header>
  );
};

export default Header;

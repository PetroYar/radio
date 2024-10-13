import React from "react";
import { translationsAside } from "../config/translations";
import "./Aside.scss";
import logo from '../../assets/icon/logo.svg'
import { useRadio } from "../hooks/useRadio";
const Aside = (props) => {
  const {language} = useRadio()
  


  return (
    <aside className="aside">
      <div className="logo">
        <img src={logo} alt="logo world radio" />
      </div>
      {Object.keys(translationsAside[language].labels).map((key) => (
        <div key={key}>
          <h3 className="aside__title">
            {translationsAside[language].labels[key]}
          </h3>

          <ul className="aside__list">
            {translationsAside[language][key].map((item, index) => (
              <li key={index}>
                <button className="aside__item">
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
    </aside>
  );
};

export default Aside;

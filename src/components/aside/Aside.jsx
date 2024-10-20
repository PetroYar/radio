import React from "react";
import { translationsAside } from "../config/translations";
import "./Aside.scss";
import logo from "../icon/logo.svg";
import { useRadio } from "../hooks/useRadio";
const Aside = (props) => {
  const { language, switchStationView, stationToFavorite } = useRadio();
 const handleButtonClick = (index, ind) => {

   switch (ind) {
     case 0: // 'menu'
       if (index === 0) {
         switchStationView('home')
       }
       break;
     case 1: // 'history'
       if (index === 0) {
         switchStationView('test')
       } else if (index === 1) {
         switchStationView('favorite');
       }
       break;
     case 2: // 'share'
       if (index === 0) {
         console.log("Instagram clicked");
       } else if (index === 1) {
         console.log("Facebook clicked");
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
    <aside className="aside">
      <div className="aside__container">
        <div className="logo">
          <img src={logo} alt="logo world radio" />
        </div>
        {Object.keys(translationsAside[language].labels).map((key, ind) => (
          <div key={key}>
            <h3 className="aside__title">
              {translationsAside[language].labels[key]}
            </h3>

            <ul className="aside__list">
              {translationsAside[language][key].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={()=>handleButtonClick(index,ind)}
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

       
      </div>
    </aside>
  );
};

export default Aside;

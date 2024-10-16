import React from "react";

import "./FilterPanel.scss";
import { popularGenres, popularMusicCountries } from "../config/constans";
import { useRadio } from "../hooks/useRadio";

const FilterPanel = (props) => {
  const { setTest, setTest1,test,test1 } = useRadio();

  const testt = (tag) =>{
    setTest(tag)
    setTest1('')
  };
  const testt1 = (country) => {
    
   setTest1(country)
    setTest('')    
    
   };

  return (
    <aside className="filter-panel">
      <ul className="filter-panel__list">
        {popularGenres.map((el) => {
          return (
            <li key={el} className={`filter-panel__item ${el == test? 'bott': ''}`}>
              <button onClick={() => testt(el)}>{el}</button>
            </li>
          );
        })}
      </ul>
      <ul className="filter-panel__list">
        {popularMusicCountries.map((el) => {
          return (
            <li key={el} className="filter-panel__item">
              <button onClick={() => testt1(el)}>{el}</button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default FilterPanel;

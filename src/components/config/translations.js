import facebook from "../icon/facebook.svg";
import favourite from "../icon/favourite.svg";
import instagram from "../icon/instagram.svg";
import home from "../icon/home.svg";
import history from "../icon/history.svg";
import loggin from "../icon/loggin.svg";
import setting from "../icon/seting.svg";

export const translationsAside = {
  en: {
    labels: {
      menu: "Menu",
      history: "History",
      share: "Share",
      general: "General",
    },
    menu: [{ name: "home", icon: home }],
    history: [
      { name: "recent", icon: history },
      { name: "favorite", icon: favourite },
    ],
    share: [
      { name: "instagram", icon: instagram },
      { name: "facebook", icon: facebook },
    ],
    general: [
      { name: "setting", icon: setting },
      { name: "log in", icon: loggin },
    ],
  },
  ua: {
    labels: {
      menu: "Меню",
      history: "Історія",
      share: "Поділитися",
      general: "Загальні",
    },
    menu: [{ name: "головна", icon: home }],
    history: [
      { name: "нещодавні", icon: history },
      { name: "вибрані", icon: favourite },
    ],
    share: [
      { name: "instagram", icon: instagram },
      { name: "facebook", icon: facebook },
    ],
    general: [
      { name: "налаштування", icon: setting },
      { name: "увійти", icon: loggin },
    ],
  },
  pl: {
    labels: {
      menu: "Menu",
      history: "Historia",
      share: "Udostępnij",
      general: "Ogólne",
    },
    menu: [{ name: "strona główna", icon: home }],
    history: [
      { name: "niedawne", icon: history },
      { name: "ulubione", icon: favourite },
    ],
    share: [
      { name: "instagram", icon: instagram },
      { name: "facebook", icon: facebook },
    ],
    general: [
      { name: "ustawienia", icon: setting },
      { name: "zaloguj się", icon: loggin },
    ],
  },
};

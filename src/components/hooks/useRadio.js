import { useContext } from "react";
import { RadioContext } from "../context/RadioContext";

export const useRadio = () => useContext(RadioContext);

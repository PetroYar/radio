import { useContext } from "react";

import { AdaptiveContext } from "../context/AdaptiveContext";

export const useAdaptive = () => useContext(AdaptiveContext);

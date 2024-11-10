import React from "react";
import { usePWAInstallPrompt } from "./hooks/usePWAInstallPrompt";

const InstallButton = () => {
  const { isInstallPromptVisible, promptInstall } = usePWAInstallPrompt();

  if (!isInstallPromptVisible) {
    return null;
  }
  const style = {
    background: "rgba(248, 133, 10, 1)",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
  };
  return <button onClick={promptInstall} style={style}>Install App</button>;
};

export default InstallButton;

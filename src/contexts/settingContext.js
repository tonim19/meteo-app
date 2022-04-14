import { createContext, useEffect, useState } from "react";
import defaultSettings from "../utils/defaultSettings";

export const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const hasSettings = localStorage.getItem("settings");

    if (!hasSettings) {
      localStorage.setItem("settings", JSON.stringify(defaultSettings));
    } else if (hasSettings && !settings) {
      setSettings(JSON.parse(hasSettings));
    } else {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;

import { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext();

const initialData = {
  temperature_unit: "celsius",
  windspeed_unit: "kmh",
  precipitation_unit: "mm",
  timezone: "UTC",
  past_days: "0",
};

const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const hasSettings = localStorage.getItem("settings");

    if (!hasSettings) {
      localStorage.setItem("settings", JSON.stringify(initialData));
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

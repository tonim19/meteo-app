import { useContext } from "react";
import { SettingsContext } from "../contexts/settingContext";

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleChange = async (e) => {
    await setSettings({ ...settings, [e.target.name]: e.target.value });
    console.log(settings);
  };

  return (
    <>
      <h1>Application Settings</h1>
      <p>Temperature Unit</p>
      <div onChange={handleChange}>
        <input
          type="radio"
          name="temperature_unit"
          id="celsius"
          value="celsius"
        />
        <label htmlFor="celsius">Celsius °C</label>
        <input
          type="radio"
          name="temperature_unit"
          id="fahrenheit"
          value="fahrenheit"
        />
        <label htmlFor="fahrenheit">Fahrenheit °F</label>
      </div>
    </>
  );
}

export default Settings;

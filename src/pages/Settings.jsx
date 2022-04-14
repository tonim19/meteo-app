import { useContext } from "react";
import RadioButton from "../components/RadioButton";
import { CitiesContext } from "../contexts/citiesContext";
import { SettingsContext } from "../contexts/settingContext";
import citiesData from "../data/gradovi";
import defaultSettings from "../utils/defaultSettings";

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { setCities } = useContext(CitiesContext);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const deleteFavorites = () => {
    const newCityArr = citiesData.map((city) => {
      return {
        ...city,
        isFavorite: false,
      };
    });
    setCities(newCityArr);
  };

  return (
    <section className="settings">
      <h1>Application Settings</h1>
      <p>Temperature Unit</p>
      <div className="temperature">
        <RadioButton
          name="temperature_unit"
          value="celsius"
          label="Celsius °C"
        />
        <RadioButton
          name="temperature_unit"
          value="fahrenheit"
          label="Fahrenheit °F"
        />
      </div>
      <p>Wind Speed Unit</p>
      <div className="windspeed">
        <RadioButton name="windspeed_unit" value="kmh" label="km/h" />
        <RadioButton name="windspeed_unit" value="ms" label="m/s" />
        <RadioButton name="windspeed_unit" value="mph" label="mph" />
        <RadioButton name="windspeed_unit" value="kn" label="kn" />
      </div>
      <p>Precipation Unit</p>
      <div className="precipation">
        <RadioButton name="precipitation_unit" value="mm" label="Milimeter" />
        <RadioButton name="precipitation_unit" value="inch" label="Inch" />
      </div>
      <p>Timezone</p>
      <div className="timezone">
        <select name="timezone" onChange={handleChange}>
          <option value="UTC">UTC</option>
          <option value="America%2FNew_York">America/NewYork</option>
          <option value="Europe%2FBerlin">Europe/Berlin</option>
          <option value="Africa%2FCairo">Africa/Cairo</option>
          <option value="Asia%2FTokio">Asia/Tokio</option>
          <option value="Australia%2FSydney">Australia/Sydney</option>
        </select>
      </div>
      <p>Past Days</p>
      <div className="pastdays">
        <select name="past_days" onChange={handleChange}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div className="buttons">
        <button onClick={() => setSettings(defaultSettings)}>
          Revert settings to default
        </button>
        <button onClick={deleteFavorites}>Delete favourites</button>
      </div>
    </section>
  );
}

export default Settings;

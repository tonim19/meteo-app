import { useContext } from "react";
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
      <div className="temperature" onChange={handleChange}>
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
      <p>Wind Speed Unit</p>
      <div className="windspeed" onChange={handleChange}>
        <input type="radio" name="windspeed_unit" id="kmh" value="kmh" />
        <label htmlFor="kmh">km/h</label>
        <input type="radio" name="windspeed_unit" id="ms" value="ms" />
        <label htmlFor="ms">m/s</label>
        <input type="radio" name="windspeed_unit" id="mph" value="mph" />
        <label htmlFor="mph">mph</label>
        <input type="radio" name="windspeed_unit" id="kn" value="kn" />
        <label htmlFor="kn">kn</label>
      </div>
      <p>Precipation Unit</p>
      <div className="precipation" onChange={handleChange}>
        <input type="radio" name="precipitation_unit" id="mm" value="mm" />
        <label htmlFor="mm">Milimeter</label>
        <input type="radio" name="precipitation_unit" id="inch" value="inch" />
        <label htmlFor="inch">Inch</label>
      </div>
      <p>Past Days</p>
      <div className="timezone">
        <select name="timezone" onChange={handleChange}>
          <option value="UTC">UTC</option>
          <option value="America%2FNewYork">America/NewYork</option>
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

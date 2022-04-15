import { useContext } from "react";
import RadioButton from "../components/RadioButton";
import SelectInput from "../components/SelectInput";
import { CitiesContext } from "../contexts/citiesContext";
import { SettingsContext } from "../contexts/settingContext";
import citiesData from "../data/gradovi";
import defaultSettings from "../utils/defaultSettings";
import {
  pastDaysVariables,
  timezoneVariables,
} from "../utils/settingsVariables";

function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { setCities } = useContext(CitiesContext);

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
        <SelectInput
          name="timezone"
          variables={timezoneVariables}
          value={settings?.timezone}
        />
      </div>
      <p>Past Days</p>
      <div className="pastdays">
        <SelectInput
          name="past_days"
          variables={pastDaysVariables}
          value={settings?.past_days}
        />
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

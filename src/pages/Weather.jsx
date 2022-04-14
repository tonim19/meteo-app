import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";
import { FaCaretDown } from "react-icons/fa";
import { dayVariables, hrVariables } from "../utils/apiVariables";
import { SettingsContext } from "../contexts/settingContext";
import CheckboxSection from "../components/CheckboxSection";

function Weather() {
  const { cities } = useContext(CitiesContext);
  const { settings } = useContext(SettingsContext);
  const { lat, lng } = useParams();

  const [weatherData, setWeatherData] = useState(null);

  const [cityObj, setCityObj] = useState({
    city: "",
    lat: "",
    lng: "",
    isFavorite: "",
  });

  const [view, setView] = useState("");

  const [hourlyVariables, setHourlyVariables] = useState(hrVariables);

  const [dailyVariables, setDailyVariables] = useState(dayVariables);

  useEffect(() => {
    const filtered = cities?.filter((city) =>
      city.lat === lat && city.lng === lng ? true : false
    );

    if (filtered) {
      setCityObj(filtered[0]);
    }
  }, [cities, lat, lng]);

  const handleChange = (e) => {
    setView(e.target.value);
  };

  const fetchData = async (arr) => {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}`;

    if (view === "hourly") {
      url += "&hourly=";
    } else if (view === "daily") {
      url += "&daily=";
    }

    const newArr = arr.reduce((acc, curr) => {
      if (curr.value) {
        acc.push(curr.name);
      }
      return acc;
    }, []);
    url += newArr.join(",");

    for (let setting in settings) {
      url += `&${setting}=${settings[setting]}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setWeatherData(data);
  };

  return (
    <>
      <h1>Weather for {cityObj?.city}</h1>
      <span className="select">
        <select value={view} onChange={handleChange}>
          <option value="">Choose</option>
          <option value="daily">Daily View</option>
          <option value="hourly">Hourly View</option>
        </select>
        <FaCaretDown />
        {view === "daily" && (
          <CheckboxSection
            name="Daily"
            variables={dailyVariables}
            setVariables={setDailyVariables}
            fetchData={fetchData}
          />
        )}
        {view === "hourly" && (
          <CheckboxSection
            name="Hourly"
            variables={hourlyVariables}
            setVariables={setHourlyVariables}
            fetchData={fetchData}
          />
        )}
      </span>
    </>
  );
}

export default Weather;

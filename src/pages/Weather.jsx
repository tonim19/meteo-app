import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";
import { dayVariables, hrVariables } from "../utils/apiVariables";
import { SettingsContext } from "../contexts/settingContext";
import CheckboxSection from "../components/CheckboxSection";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Weather() {
  const { cities } = useContext(CitiesContext);
  const { settings } = useContext(SettingsContext);
  const { cityName, lat, lng } = useParams();

  const [weatherData, setWeatherData] = useState({});

  const [cityObj, setCityObj] = useState({});

  const [view, setView] = useState("");

  const [hourlyVariables, setHourlyVariables] = useState(hrVariables);

  const [dailyVariables, setDailyVariables] = useState(dayVariables);

  const [graphData, setGraphData] = useState([]);

  const [checkboxNames, setCheckboxNames] = useState([]);

  useEffect(() => {
    const filtered = cities?.filter((city) =>
      city.lat === lat &&
      city.lng === lng &&
      city.city.toLowerCase() === cityName
        ? true
        : false
    );

    if (filtered) {
      setCityObj(filtered[0]);
    }
  }, [cities, lat, lng, cityName]);

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
    setCheckboxNames(newArr);
    url += newArr.join(",");

    for (let setting in settings) {
      url += `&${setting}=${settings[setting]}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setWeatherData(data);
  };

  useEffect(() => {
    let newArr = [];
    if (view === "hourly") {
      for (let i = 0; i < weatherData?.hourly?.time?.length; i++) {
        let newObj = {};
        for (let item in weatherData?.hourly) {
          newObj = { ...newObj, [item]: weatherData?.hourly?.[item][i] };
        }
        newArr.push(newObj);
      }
    } else if (view === "daily") {
      for (let i = 0; i < weatherData?.daily?.time?.length; i++) {
        let newObj = {};
        for (let item in weatherData?.daily) {
          newObj = { ...newObj, [item]: weatherData?.daily?.[item][i] };
        }
        newArr.push(newObj);
      }
    }
    setGraphData(newArr);
  }, [weatherData, view]);

  return (
    <>
      <h1 className="weather-title">Weather for {cityObj?.city}</h1>
      <section className="select">
        <div className="custom-select">
          <select value={view} onChange={handleChange}>
            <option value="">Choose</option>
            <option value="daily">Daily View</option>
            <option value="hourly">Hourly View</option>
          </select>
          <span className="custom-arrow"></span>
        </div>
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
      </section>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart
          data={graphData}
          margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
        >
          <CartesianGrid verticalPoints={[3]} />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {checkboxNames.map((checkbox, index) => {
            const randomColor =
              "#" + Math.floor(Math.random() * 16777215).toString(16);

            return (
              <Line
                key={index}
                type="monotone"
                dataKey={checkbox}
                stroke={randomColor}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Weather;

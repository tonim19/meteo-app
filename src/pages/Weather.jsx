import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";
import { FaCaretDown } from "react-icons/fa";
import { dayVariables, hrVariables } from "../utils/apiVariables";
import { SettingsContext } from "../contexts/settingContext";
import CheckboxSection from "../components/CheckboxSection";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

  const [graphData, setGraphData] = useState([]);

  const [checkboxNames, setCheckboxNames] = useState([]);

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
      <h1>Weather for {cityObj?.city}</h1>
      <section className="select">
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
      </section>
      <LineChart
        width={730}
        height={250}
        data={graphData}
        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
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
    </>
  );
}

export default Weather;

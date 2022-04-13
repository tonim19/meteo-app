import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";
import { FaCaretDown } from "react-icons/fa";
import { dayVariables, hrVariables } from "../utils/apiVariables";

function Weather() {
  const { cities } = useContext(CitiesContext);
  const { lat, lng } = useParams();

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

  const handleDailyChange = (id) => {
    const daily = dailyVariables.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value: !item.value,
        };
      } else {
        return item;
      }
    });

    setDailyVariables(daily);
  };

  const handleHourlyChange = (id) => {
    const hourly = hourlyVariables.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value: !item.value,
        };
      } else {
        return item;
      }
    });

    setHourlyVariables(hourly);

    fetchData(hourly);
  };

  const fetchData = async (arr) => {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}`;

    if (view === "hourly") {
      url += "&hourly=";
    } else if (view === "daily") {
      url += "&daily=";
    }

    const newArr = arr.filter((item) => item.value).map((item) => item.name);
    url += newArr.join(",");

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
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
          <section className="daily">
            <h2>Daily Weather Variables</h2>
            {dailyVariables?.map(({ id, name, value }) => {
              return (
                <div key={id}>
                  <input
                    type="checkbox"
                    id={name}
                    checked={value}
                    onChange={() => handleDailyChange(id)}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              );
            })}
          </section>
        )}
        {view === "hourly" && (
          <section className="hourly">
            <h2>Hourly Weather Variables</h2>
            {hourlyVariables?.map(({ id, name, value }) => {
              return (
                <div key={id}>
                  <input
                    type="checkbox"
                    id={name}
                    checked={value}
                    onChange={() => handleHourlyChange(id)}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              );
            })}
          </section>
        )}
      </span>
    </>
  );
}

export default Weather;

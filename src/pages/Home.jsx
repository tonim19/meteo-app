import { useEffect, useState } from "react";
import citiesData from "../data/gradovi";
import { FaRegStar, FaStar } from "react-icons/fa";

function Home() {
  const [cities, setCities] = useState(citiesData);
  const [searchField, setSearchField] = useState("");
  const [filteredCities, setFilteredCities] = useState([
    { city: "", lat: "", lng: "" },
  ]);

  useEffect(() => {
    const filtered = cities
      .filter((city) =>
        city.city.toLowerCase().includes(searchField.toLowerCase())
      )
      .slice(0, 5);

    setFilteredCities(filtered);
  }, [searchField, cities]);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      <h1>Meteo App</h1>
      <input type="search" value={searchField} onChange={handleChange} />
      {filteredCities.map((city, index) => {
        return (
          <div key={index} className="card">
            <h2 className="card-title">{city.city}</h2>
            <div className="star">
              {city?.isFavorite ? <FaStar /> : <FaRegStar />}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Home;

import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "../contexts/citiesContext";
import CardList from "../components/CardList";

function Home() {
  const { cities } = useContext(CitiesContext);
  const [searchField, setSearchField] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (searchField === "") return setFilteredCities([]);
    const filtered = cities
      ?.filter((city) =>
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
      <CardList filteredCities={filteredCities} />
    </>
  );
}

export default Home;

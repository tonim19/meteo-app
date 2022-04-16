import { useContext, useState } from "react";
import { CitiesContext } from "../contexts/citiesContext";
import CardList from "../components/CardList";

function Home() {
  const { cities } = useContext(CitiesContext);
  const [searchField, setSearchField] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleChange = (e) => {
    const filtered = cities
      ?.filter((city) =>
        city.city.toLowerCase().includes(searchField.toLowerCase())
      )
      .slice(0, 5);

    setFilteredCities(filtered);
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

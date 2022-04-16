import { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";

function Navbar() {
  const { cities, handleFavoriteChange } = useContext(CitiesContext);

  const navigate = useNavigate();

  const [favoriteCities, setFavoriteCities] = useState([]);

  const [sidebar, setSidebar] = useState(false);

  const [filter, setFilter] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const favoriteCities = cities?.filter((city) => city.isFavorite);
    if (!filter) {
      favoriteCities?.sort((a, b) => (a.city > b.city ? 1 : -1));
    } else {
      favoriteCities?.sort((a, b) => (a.city > b.city ? -1 : 1));
    }
    setFavoriteCities(favoriteCities);
  }, [cities, filter]);

  return (
    <>
      <div className="navbar">
        <FaBars onClick={showSidebar} />
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <FaTimes
          size={30}
          className="nav-close"
          onClick={() => setSidebar(!sidebar)}
        />
        <h1>Favourites</h1>
        <p className="nav-filter">
          Filter by: <span onClick={() => setFilter(false)}>Ascending </span>/
          <span onClick={() => setFilter(true)}> Descending</span>
        </p>
        <ul className="nav-menu-items">
          {favoriteCities?.map((cityObj, index) => {
            const { city, lat, lng } = cityObj;
            return (
              <li className="nav-link" key={index}>
                <h2
                  className="nav-title"
                  onClick={() => {
                    setSidebar(!sidebar);
                    navigate(`/weather/${city.toLowerCase()}/${lat}/${lng}`);
                  }}
                >
                  {city}
                </h2>
                <div
                  className="toggle"
                  onClick={() => handleFavoriteChange(cityObj)}
                >
                  <FaTimes size={20} />
                </div>
              </li>
            );
          })}
          <li className="nav-home">
            <h2
              className="nav-title"
              onClick={() => {
                setSidebar(!sidebar);
                navigate("/");
              }}
            >
              Home
            </h2>
          </li>
          <li className="nav-footer">
            <h2
              className="nav-title"
              onClick={() => {
                setSidebar(!sidebar);
                navigate("/settings");
              }}
            >
              Settings
            </h2>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

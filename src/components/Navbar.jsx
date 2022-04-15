import { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";

function Navbar() {
  const { cities } = useContext(CitiesContext);
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const favoriteCities = cities?.filter((city) => city.isFavorite);
    setFavoriteCities(favoriteCities);
  }, [cities]);

  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
        <ul className="nav-menu-items">
          {favoriteCities?.map((cityObj, index) => {
            const { city, lat, lng } = cityObj;
            return (
              <li key={index}>
                <h2
                  className="nav-title"
                  onClick={() => {
                    setSidebar(!sidebar);
                    navigate(`/weather/${city.toLowerCase()}/${lat}/${lng}`);
                  }}
                >
                  {city}
                </h2>
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

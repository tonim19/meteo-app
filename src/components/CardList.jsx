import { useContext } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";

function CardList({ filteredCities }) {
  const { handleFavoriteChange } = useContext(CitiesContext);

  const navigate = useNavigate();

  return (
    <>
      {filteredCities?.map((cityObj, index) => {
        const { city, lat, lng, isFavorite } = cityObj;
        return (
          <div key={index} className="card">
            <div
              className="card-title"
              onClick={() =>
                navigate(`/weather/${city.toLowerCase()}/${lat}/${lng}`)
              }
            >
              {city}
            </div>
            <div
              className="toggle"
              onClick={() => handleFavoriteChange(cityObj)}
            >
              {isFavorite ? <FaStar /> : <FaRegStar />}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CardList;

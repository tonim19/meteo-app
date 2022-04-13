import { useContext } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CitiesContext } from "../contexts/citiesContext";

function CardList({ filteredCities }) {
  const { cities, setCities } = useContext(CitiesContext);

  const navigate = useNavigate();

  const handleFavoriteChange = (cityObj) => {
    const newCitiesArr = cities.map((item) => {
      if (item === cityObj) {
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      } else {
        return item;
      }
    });

    setCities(newCitiesArr);
  };
  return (
    <>
      {filteredCities?.map((cityObj, index) => {
        const { city, lat, lng, isFavorite } = cityObj;
        return (
          <div key={index} className="card">
            <div
              className="card-title"
              onClick={() => navigate(`/weather/${lat}/${lng}`)}
            >
              {city}
            </div>
            <div className="star" onClick={() => handleFavoriteChange(cityObj)}>
              {isFavorite ? <FaStar /> : <FaRegStar />}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CardList;

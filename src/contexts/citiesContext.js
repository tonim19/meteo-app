import { createContext, useEffect, useState } from "react";
import citiesData from "../data/gradovi";

export const CitiesContext = createContext();

const CitiesContextProvider = ({ children }) => {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const hasCities = localStorage.getItem("cities");

    if (!hasCities) {
      const newCityArr = citiesData.map((city) => {
        return {
          ...city,
          isFavorite: false,
        };
      });
      localStorage.setItem("cities", JSON.stringify(newCityArr));
      setCities(newCityArr);
    } else if (hasCities && !cities) {
      setCities(JSON.parse(hasCities));
    } else {
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }, [cities]);

  return (
    <CitiesContext.Provider value={{ cities, setCities }}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesContextProvider;

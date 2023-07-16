import axios from "axios";
import { City } from "@/types/city";

export const getCity = async (cityName: string): Promise<City | undefined> => {
  const cities = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCALHOST}/data/citylist.json`) //
    .then((res) => res.data);

  return cities.find(
    (city: City) =>
      city.name.replace(/(\s*)/g, "").toLowerCase() ===
      decodeURIComponent(cityName).replace(/(\s*)/g, "").toLowerCase()
  );
};

export const getCitiesFor = async (cityName: string): Promise<City[] | []> => {
  const cities = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCALHOST}/data/citylist.json`) //
    .then((res) => res.data);

  let recommands: City[] | null = [];
  cities.map((city: City) =>
    city.name
      .replace(/(\s*)/g, "")
      .toLowerCase()
      .includes(
        decodeURIComponent(cityName).replace(/(\s*)/g, "").toLowerCase()
      )
      ? recommands?.push(city)
      : ""
  );
  return recommands;
};

import axios from "axios";
import { City } from "@/types/city";

// const getCitylist = async (): Promise<City[]> => {
//   const data = fs.readFileSync(
//     join(process.cwd(), "/public/data/citylist.json"),
//     "utf-8"
//   );
//   return JSON.parse(data);
// };

export const getCity = async (cityName: string): Promise<City | undefined> => {
  const cities = await axios
    .get(`http://localhost:3000/data/citylist.json`) //
    .then((res) => res.data);

  return cities.find(
    (city: City) =>
      city.name.replace(/(\s*)/g, "").toLowerCase() ===
      decodeURIComponent(cityName).replace(/(\s*)/g, "").toLowerCase()
  );
};

export const getCitiesFor = async (cityName: string): Promise<City[] | []> => {
  const cities = await axios
    .get(`http://localhost:3000/data/citylist.json`) //
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

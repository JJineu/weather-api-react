import { join } from "path";
import fs from "fs";
import { City } from "@/types/city";

export const getCitylist = async (): Promise<City[]> => {
  const data = fs.readFileSync(
    join(process.cwd(), "/public/data/citylist.json"),
    "utf-8"
  );
  return JSON.parse(data);
};

export const getCity = async (cityName: string): Promise<City | undefined> => {
  const cities = await getCitylist();
  return cities.find(
    (city: City) =>
      city.name.replace(/(\s*)/g, "").toLowerCase() ===
      decodeURIComponent(cityName).replace(/(\s*)/g, "").toLowerCase()
  );
};

export const getCitiesFor = async (cityName: string): Promise<City[] | []> => {
  const cities = await getCitylist();
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

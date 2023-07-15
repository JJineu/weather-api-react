import { join } from "path";
import fs from "fs";
import CityList from "./components/CityList";

export const getCitylist = async () => {
  const data = fs.readFileSync(
    join(process.cwd(), "/public/data/citylist.json"),
    "utf-8"
  );
  return JSON.parse(data);
};

const MainPage = async () => {
  const cities = await getCitylist();

  return <CityList cities={cities} />;
};

export default MainPage;

import CityList from "./components/CityList";
import { getCitylist } from "@/service/city";

const MainPage = async () => {
  const cities = await getCitylist();

  return <CityList cities={cities} />;
};

export default MainPage;

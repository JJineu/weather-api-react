import CityList from "./components/CityList";
import axios from "axios";

const MainPage = async () => {
  const cities = await axios
    .get(`http://localhost:3000/data/citylist.json`) //
    .then((res) => res.data);

  return <CityList cities={cities} />;
};

export default MainPage;

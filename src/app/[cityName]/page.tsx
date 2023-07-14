import { useQuery } from "@tanstack/react-query";
import CityDetail from "../components/CityDetail";
import { notFound } from "next/navigation";
import { City } from "@/types/city";
import axios from "axios";

type Props = {
  params: {
    cityName: string;
  };
};

export default async function page({ params: { cityName } }: Props) {
  const cities = await axios
    .get(`http://localhost:3000/data/haha.json`) //
    .then((res) => res.data);

  const city = await cities.find(
    (city: City) => encodeURIComponent(city.name) === cityName
  );

  if (!city) {
    console.log("page start");
    notFound();
  }

  return (
    <div>
      {"city detail"}
      {city.name}
      <CityDetail city={city} />
    </div>
  );
}

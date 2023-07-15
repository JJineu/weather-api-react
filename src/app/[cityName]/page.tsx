import { useQuery } from "@tanstack/react-query";
import CityDetail from "../components/CityDetail";
import { notFound } from "next/navigation";
import { City } from "@/types/city";
import axios from "axios";
import { useGetCitesQuery } from "@/hooks/city";

type Props = {
  params: {
    cityName: string;
  };
};

export default async function page({ params: { cityName } }: Props) {
  const cities = await axios
    .get(`http://localhost:3000/data/citylist.json`) //
    .then((res) => res.data);

  // const { data: cities, isLoading } = useGetCitesQuery();

  const city = await cities.find(
    (city: City) =>
      city.name.replace(/(\s*)/g, "").toLowerCase() ===
      decodeURIComponent(cityName).replace(/(\s*)/g, "").toLowerCase()
  );

  if (!city) {
    notFound(); 
  }

  return (
    <div>
      <CityDetail city={city} />
    </div>
  );
}
``
import CityDetail from "../components/CityDetail";
import { notFound } from "next/navigation";
import { getCity } from "@/service/city";

type Props = {
  params: {
    cityName: string;
  };
};
export default async function page({ params: { cityName } }: Props) {
  const city = await getCity(cityName);

  if (!city) {
    notFound();
  }

  return (
    <div>
      <CityDetail city={city} />
    </div>
  );
}
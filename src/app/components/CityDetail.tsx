"use client";

import { City, SimpleWeather } from "@/types/city";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  city: City;
};
export default function CityDetail({ city }: Props) {
  const { data: weather, isLoading } = useQuery(
    ["weather", city.name],
    async () => {
      return await axios
        .get(
          `http://localhost:3000/data/weather.json`
          //   `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.OPENWEATHER_SECRET}`
        )
        .then(({ data }) => data)
        .then((data) => data.current.weather[0]);
    }
  );

  if (isLoading) return <div> 로딩중</div>;

  return (
    <div>
      {"detail component"}
      {weather?.main}
      {weather?.description}
      <img
        src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
        alt="weatherIcon"
      />
    </div>
  );
}

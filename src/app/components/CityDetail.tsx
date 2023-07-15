"use client";

import { City, SimpleWeather } from "@/types/city";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./styles/CityDetail.module.css";

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
          //   `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.OPENWEATHER_SECRET}&units=metric`
        )
        .then(({ data }) => data)
        // .then((data) => data.current.weather[0]);
        .then((data) => data.current);
    }
  );

  if (isLoading) return <div> 로딩중</div>;
  const { icon, main, description } = weather.weather[0];
  const { temp, humidity, wind_speed } = weather;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.fix}>Result for </span>
        <span
          className={styles.result}
        >{`${city.name} (${city.country})`}</span>
      </div>
      <div className={styles.main}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weatherIcon"
          className={styles.weatherIcon}
        />
        <p>
          {Math.round(temp)}
          <span className={styles.fix}> ℃</span>
          <br />
          <span className={styles.fix}>{main}</span>
        </p>
      </div>
    </div>
  );
}

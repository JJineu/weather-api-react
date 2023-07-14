"use client";

import { City } from "@/types/city";
import { useQuery } from "@tanstack/react-query";
import CityCard from "./CityCard";
import styles from "./styles/CityList.module.css";
import axios from "axios";

export default function CityList() {
  const { data: cities } = useQuery(
    ["cities", "all"],
    async () => {
      return await axios
        .get(`/data/haha.json`) //
        .then((res) => res.data);
    },
    { cacheTime: 1000 * 60 * 10 }
  );

  return (
    <div>
      {"city - list"}
      <div className={styles.grid_container}>
        {cities &&
          cities.map((city: City) => (
            <div key={city.id} className={styles.grid_item}>
              <CityCard city={city} />
            </div>
          ))}
      </div>
    </div>
  );
}

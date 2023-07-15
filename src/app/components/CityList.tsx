"use client";

import { City } from "@/types/city";
import styles from "./styles/CityList.module.css";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CityList() {
  const { data: cities } = useQuery(
    ["cityList"],
    () => {
      return axios
        .get(`/data/citylist.json`) //
        .then(({ data }) => data);
    },
    { cacheTime: 1000 * 60 * 10 }
  );

  if (!cities) return;

  return (
    <div className={styles.container}>
      <div className={styles.grid_container}>
        {cities &&
          cities.map((city: City) => (
            <Link
              href={`/${city.name}`}
              className={styles.grid_item}
              key={city.id}
            >
              {city.name}
            </Link>
          ))}
      </div>
    </div>
  );
}

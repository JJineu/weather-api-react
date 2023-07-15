"use client";

import { City } from "@/types/city";
import { useQuery } from "@tanstack/react-query";
import styles from "./styles/CityList.module.css";
import axios from "axios";
import Link from "next/link";

export default function CityList() {
  const { data: cities } = useQuery(
    ["cities", "all"],
    async () => {
      return await axios
        .get(`/data/citylist.json`) //
        .then((res) => res.data);
    },
    { cacheTime: 1000 * 60 * 10 }
  );

  return (
    <div>
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

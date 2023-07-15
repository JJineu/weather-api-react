"use client";

import { City } from "@/types/city";
import styles from "./styles/CityList.module.css";
import Link from "next/link";

type Props = {
  cities: City[];
};
export default function CityList({ cities }: Props) {

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

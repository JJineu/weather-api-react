"use client";

import { City } from "@/types/city";
import Link from "next/link";

type Props = {
  city: City;
};
export default function CityCard({ city }: Props) {
  return (
    <div>
      <Link href={`/${city.name}`}>{city.name}</Link>
    </div>
  );
}

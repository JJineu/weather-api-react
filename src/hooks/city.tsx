// async function getCityForCitylist(cityName:string) {
//   return fetch(`/data/haha.json`).then(res => res.json()).then(data => data.name)
// }
// const getCity = cache(async (cityName: stirng) => getCityForCitylist{cityName})
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCitesQuery = () => {
  return useQuery(
    ["cities", "all"],
    () => {
      return axios
        .get(`/data/citylist.json`) //
        .then(({ data }) => data);
    },
    { cacheTime: 1000 * 60 * 10 }
  );
};

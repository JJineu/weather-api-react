"use client";

import SearchHistory from "./SearchHistory";
import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CityCard from "./CityCard";

export default function SearchHeader() {
  const [keyword, setKeyword] = useState("");
  const { data: city, isLoading } = useQuery(["cities", keyword], async () => {
    await fetch(`/data/haha.json`) //
      .then((res) => res.json());
  });
  // const isCity = cities?.filter((city) => city.name.include(keyword));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onFocus = () => {};

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="도시 이름을 입력해주세요"
          onFocus={onFocus}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {isLoading && <p>검색 중입니다</p>}
      {/* {city && <CityCard city={city} />} */}
      <SearchHistory />
    </div>
  );
}

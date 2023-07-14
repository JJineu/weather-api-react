"use client";

import SearchHistory from "./SearchHistory";
import { FormEvent, useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/debounce";
import { useGetCitesQuery } from "@/hooks/city";
import { useSetRecoilState } from "recoil";
import { KeywordListState } from "../recoil/atoms";
import { City } from "@/types/city";

export default function SearchHeader() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const setKeywordList = useSetRecoilState(KeywordListState);
  const [isShow, setIsShow] = useState(false);
  const { data: cities, isLoading } = useGetCitesQuery();
  const [isActiveHistory, activeHistory] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleOutOfRange = (e: MouseEvent) => {
  //     if (inputRef.current?.contains(e.target as Node)) return;
  //     activeHistory(false);
  //   };

  //   window.addEventListener("mousedown", handleOutOfRange);

  //   return () => {
  //     window.removeEventListener("mousedown", handleOutOfRange);
  //   };
  // }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.length === 0) return;
    const resultCity = cities?.find(
      (city: City) =>
        encodeURIComponent(city.name) === encodeURIComponent(debouncedKeyword)
    );
    if (!resultCity) {
      setKeyword("");
      return(alert('존재하지 않는 도시입니다'))
    }
    handleAddKeyword(keyword);
    setKeyword("");
  };

  const onFocus = () => {
    activeHistory(true);
  };
  const onBlur = () => {
    setTimeout(() => {
      activeHistory(false);
    }, 500);
  };

  const handleAddKeyword = (keyword) => {
    setKeywordList((old) => [
      keyword,
      ...old.filter((item) => item !== keyword),
    ]);
  };

  if (isLoading) return <div> 로딩중</div>;

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (inputRef.current?.contains(e.relatedTarget)) return;
    activeHistory(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="도시 이름을 입력해주세요"
          // onFocus={() => activeHistory(true)}
          onFocus={onFocus}
          onBlur={onBlur}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={onSubmit}>검색!</button>
      </form>
      {isActiveHistory && <SearchHistory />}
    </div>
  );
}

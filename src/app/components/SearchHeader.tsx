"use client";

import SearchHistory from "./SearchHistory";
import { FormEvent, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { KeywordListState } from "../store/KeywordListState";
import { City } from "@/types/city";
import { useRouter } from "next/navigation";
import SearchButton from "./icons/SearchButton";
import styles from "./styles/SearchHeader.module.css";
import Link from "next/link";
import { getCity } from "@/service/city";
import useDebounce from "@/hooks/debounce";

export default function SearchHeader() {
  const [keyword, setKeyword] = useState("");
  const setKeywordList = useSetRecoilState(KeywordListState);
  const [activeHistory, setActiveHistory] = useState(false);
  const router = useRouter();

  const onFocus = () => {
    if (keyword.length === 0) setActiveHistory(true);
  };
  const onBlur = () => {
    setTimeout(() => {
      setActiveHistory(false);
    }, 500);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (keyword.length === 0) return;
    const city: City | undefined = await getCity(keyword);

    if (!city) {
      setKeyword("");
      return alert("도시 이름을 찾을 수 없습니다.");
    }

    handleAddKeyword(city.name);
    router.push(`/${city.name}`);
    setKeyword("");
  };

  const handleAddKeyword = (keyword: string) => {
    setKeywordList((old: string[]) => [
      keyword,
      ...old.filter((item) => item !== keyword),
    ]);
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <p className={styles.title} aria-label="Home">
          <Link href={"/"}>Weather</Link>
        </p>
        <form className={styles.form} onSubmit={onSubmit} aria-label="Search">
          <input
            className={styles.input}
            type="text"
            placeholder="도시 이름을 입력해주세요"
            onFocus={onFocus}
            onBlur={onBlur}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton onClick={onSubmit} />
        </form>
      </div>
      <div className={styles.history}>{activeHistory && <SearchHistory />}</div>
    </div>
  );
}

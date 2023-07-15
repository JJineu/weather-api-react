"use client";

import SearchHistory from "./SearchHistory";
import { FormEvent, useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/debounce";
import { useGetCitesQuery } from "@/hooks/city";
import { useSetRecoilState } from "recoil";
import { KeywordListState } from "../recoil/KeywordListState";
import { City } from "@/types/city";
import { useRouter } from "next/navigation";
import SearchButton from "./icons/SearchButton";
import styles from "./styles/SearchHeader.module.css";
import Link from "next/link";

export default function SearchHeader() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 100);
  const setKeywordList = useSetRecoilState(KeywordListState);
  const [isShow, setIsShow] = useState(false);
  const { data: cities, isLoading } = useGetCitesQuery();
  const [isActiveHistory, activeHistory] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
  // console.log('Gorkh ā  '.replace(/(\s*)/g, "").toLowerCase())

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.length === 0) return;
    setKeyword(keyword.replace(/(\s*)/g, ""));
    const resultCity = cities?.find(
      (city: City) =>
        encodeURIComponent(city.name.toLowerCase()) ===
        encodeURIComponent(keyword.replace(/(\s*)/g, "").toLowerCase())
    );
    if (!resultCity) {
      setKeyword("");
      return alert("도시 이름을 찾을 수 없습니다.");
    }
    handleAddKeyword(keyword);
    router.push(`/${keyword}`);
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

  if (isLoading) return <div className={styles.header}></div>;

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (inputRef.current?.contains(e.relatedTarget)) return;
    activeHistory(false);
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
            // onFocus={() => activeHistory(true)}
            onFocus={onFocus}
            onBlur={onBlur}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton onClick={onSubmit} />
        </form>
      </div>
      <div className={styles.history}>
        {isActiveHistory && <SearchHistory />}
      </div>
    </div>
  );
}

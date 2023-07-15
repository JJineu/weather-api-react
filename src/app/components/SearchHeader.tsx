"use client";

import SearchHistory from "./SearchHistory";
import { FormEvent, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { KeywordListState } from "../store/KeywordListState";
import { City } from "@/types/city";
import { useRouter } from "next/navigation";
import SearchButton from "./icons/SearchButton";
import styles from "./styles/SearchHeader.module.css";
import Link from "next/link";
import { getCitiesFor, getCity } from "@/service/city";
import useDebounce from "@/hooks/debounce";
import SearchRecommand from "./SearchRecommand";

export default function SearchHeader() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);
  const setKeywordList = useSetRecoilState(KeywordListState);
  const [activeHistory, setActiveHistory] = useState(false);
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

  // const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
  //   if (inputRef.current?.contains(e.relatedTarget)) return;
  //   setActiveHistory(false);
  // };

  const onTyping = (e: string) => {
    setKeyword(e);
    setActiveHistory(false);
  };

  const onFocus = () => {
    if (keyword.length === 0) setActiveHistory(true);
  };
  const onBlur = () => {
    setActiveHistory(false);
    // setTimeout(() => {}, 500);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (keyword.length === 0) return;
    const city: City | undefined = await getCity(keyword);
    console.log(city);
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

  // const recommandCities = async (): Promise<City[] | []> =>
  //   await getCitiesFor(debouncedKeyword);
  // if (recommandCities.length === 0) return <div>loading</div>;
  // if (isLoading) return <div className={styles.header}></div>;

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
            onChange={(e) => onTyping(e.target.value)}
          />
          <SearchButton onClick={onSubmit} />
        </form>
      </div>
      <div className={styles.history}>{activeHistory && <SearchHistory />}</div>
      <div className={styles.history}>
        {/* {recommandCities && <SearchRecommand />} */}
      </div>
    </div>
  );
}

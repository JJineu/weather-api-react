"use client";

import { useRecoilState } from "recoil";
import { KeywordListState } from "../store/KeywordListState";
import Link from "next/link";
import styles from "./styles/SearchHistory.module.css";
import SearchDeleteButton from "./icons/SearchDeleteButton";
import SearchDeleteAllButton from "./icons/SearchDeleteAllButton";

export default function SearchHistory() {
  const [keywordList, setKeywordList] = useRecoilState(KeywordListState);

  const handleRemove = (idx: number) => {
    setKeywordList((pre: string[]) => [
      ...pre.slice(0, idx),
      ...pre.slice(idx + 1),
    ]);
  };
  const handleRemoveAll = () => {
    setKeywordList([]);
  };

  return (
    <div className={styles.container}>
      {keywordList.length === 0 ? (
        <p className={styles.title}>최근 검색한 기록이 없습니다</p>
      ) : (
        <>
          <div className={styles.title}>
            <p>최근 검색어</p>
            <SearchDeleteAllButton onClick={handleRemoveAll} />
          </div>
          <div className={styles.keywords}>
            {keywordList.map((keyword: string, idx: number) => (
              <div className={styles.keyword} key={idx}>
                <Link href={`/${keyword}`}>{keyword}</Link>
                <SearchDeleteButton onClick={() => handleRemove(idx)} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

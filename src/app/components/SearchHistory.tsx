"use client";
import { useRecoilState } from "recoil";
import CityCard from "./CityCard";
import { KeywordListState } from "../recoil/atoms";
import { City } from "@/types/city";
import Link from "next/link";

type Keyword = {
  id: string;
  text: string;
};
type Props = {
  // isShow: boolean;
  city: City;
};
export default function SearchHistory() {
  const [keywordList, setKeywordList] = useRecoilState(KeywordListState);
  if (keywordList.length === 0) {
    return <p>최근 검색한 기록이 없습니다</p>;
  }

  const handleRemove = (idx: number) => {
    setKeywordList((pre) => [...pre.slice(0, idx), ...pre.slice(idx + 1)]);
  };
  const handleRemoveAll = () => {
    setKeywordList([]);
  };

  return (
    <div>
      <div>
        <h3>최근 검색어</h3>
        <button onClick={handleRemoveAll}>전체 삭제</button>
      </div>
      <div>
        {keywordList.map((keyword, idx) => (
          <div key={idx}>
            <Link href={`/${keyword}`}>{keyword}</Link>
            {/* <p>{keyword}</p> */}
            <CityCard city={keyword} />
            <button onClick={() => handleRemove(idx)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const KeywordListState = atom({
  key: "Keyword",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

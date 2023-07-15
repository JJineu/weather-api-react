import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const CityListState = atom({
  key: "CityList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

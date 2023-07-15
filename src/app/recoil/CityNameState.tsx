import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const CityNameState = atom({
  key: "CityName",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

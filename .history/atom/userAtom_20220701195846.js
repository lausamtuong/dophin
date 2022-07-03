import { useSession } from "next-auth/react";
import { atom } from "recoil";

export const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: .user, // default value (aka initial value)
});
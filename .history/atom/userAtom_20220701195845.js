import { useSession } from "next-auth/react";
import { atom } from "recoil";

export const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: session.user, // default value (aka initial value)
});
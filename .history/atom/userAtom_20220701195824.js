import { useSession } from "next-auth/react";
import { atom } from "recoil";
const {data:session} = useSession()
export const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: session, // default value (aka initial value)
});
import React from "react";
import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
const SideBar = () => {
  return (
    <div>
      <div className="">
        <Image
          width="50"
          height="50"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        ></Image>
      </div>

      <div>
        <SideBarMenuItem Text='Home' Icon={HomeIcon}/>
      </div>
    </div>
  );
};

export default SideBar;

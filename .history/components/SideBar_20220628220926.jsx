import React from "react";
import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
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
        <SideBarMenuItem></SideBarMenuItem>
      </div>
    </div>
  );
};

export default SideBar;

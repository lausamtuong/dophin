import React, { useEffect, useState } from "react";
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { signIn, signOut } from "next-auth/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
const SideBar = ({ session }) => {
  const router = useRouter();
  const [currentUser] = useRecoilState(userState);
  const [likes_noti, setLikes_noti] = useState([]);
  const notify = () => {
    router.push(`/notifications/${currentUser?.uid}`);
    toast("Wow so easy!");
  };

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = onSnapshot(
        collection(db, "noti", currentUser?.uid || "1", "likes_noti"),
        (snapshot) => {
          setLikes_noti(snapshot.docs);
        }
      );
    }
  }, [db, currentUser]);

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-16">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width="100"
          height="100"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dolphin-logo.svg/2048px-Dolphin-logo.svg.png"
        ></Image>
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <Badge
              badgeContent={likes_noti?.length}
              color="primary"
              onClick={notify}
            >
              <SidebarMenuItem text="Thông báo" Icon={NotificationsNoneIcon} />
              {/* <MailIcon color="action" /> */}
            </Badge>
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />

            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            DoPhin
          </button>

          {/* Mini-Profile */}

          <div
            className="hoverEffect text-gray-700 flex items-center 
          justify-center xl:justify-start mt-auto  flex-wrap"
          >
            <img
              onClick={signOut}
              src={session?.user?.image}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session?.user?.name}</h4>
              <p className="text-gray-500">{session?.user?.email}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          // onClick={() => router.push("/auth/signin")}
          onClick={signIn}
          className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default SideBar;

import { useUnmountEffect } from "framer-motion";
import { useSession } from "next-auth/react";

import Head from "next/head";
import CommentModal from "../components/CommentModal";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";

export default function Home({newsResults,randomUsersResults }) {
 
 const {data:session} = useSession()
  return (
    <div>
      <Head>
        <title>Dophin Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto">
        <SideBar session={session}/>
        <Feed/>
        <Widgets newsResults={newsResults?.articles}  randomUsersResults={randomUsersResults?.results} />
        <CommentModal/>
      </main>
    </div>
  );
}
export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // Who to follow section

  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
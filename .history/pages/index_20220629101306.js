import Head from "next/head";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SideBar />
        <Feed/>
        <Ư
      </main>
    </div>
  );
}

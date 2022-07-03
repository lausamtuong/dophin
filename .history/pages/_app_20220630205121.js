import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import {Recoil}
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

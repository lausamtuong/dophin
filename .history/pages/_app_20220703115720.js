import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import {RecoilRoot} from "recoil"
import { ErrorBoundary } from"
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
      <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

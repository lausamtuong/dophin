import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "./";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
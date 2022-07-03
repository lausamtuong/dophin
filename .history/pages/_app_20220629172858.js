import '../styles/globals.css'
import {SessionProvider} from"next-auth/react"
function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return 
  <SessionProvider></SessionProvider>
  <Component {...pageProps} />
}

export default MyApp

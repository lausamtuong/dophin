import '../styles/globals.css'
import {SessionProvider} from"next-auth/react"
function MyApp({ Component, pageProps:{session,...page} }) {
  return <Component {...pageProps} />
}

export default MyApp

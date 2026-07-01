import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import reportWebVitals from '@/reportWebVitals'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

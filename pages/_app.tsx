import { Provider } from "react-redux"
import "../ui/styles/global.css"
import { store } from "../util/redux/store/store"

export default function App({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

import Header from "./components/Header"
import Body from "./components/Body"
import { ToastContainer } from "react-toastify"

export default function App() {

  return (
    <div>
      <ToastContainer />
      <div className='z-10 m-auto my-10 min-w-[250px] w-[20vw]'>
        <Header />
        <Body />
      </div>
    </div>
  )
}
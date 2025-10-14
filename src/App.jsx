import Header from "./components/Header"
import Body from "./components/Body"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Option from "./components/Option"

export default function App() {

  const option = useSelector(state => state.note.option)

  return (
    <div>
      <div className='z-10 m-auto my-10 min-w-[250px] w-[20vw]'>
        <Header />
        <Body />
      </div>
    </div>
  )
}
import Header from "./components/Header"
import Body from "./components/Body"
import { ToastContainer } from "react-toastify"
import NoteList from "./components/NoteList"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function App() {

  const { selectedNote } = useSelector(state => state.note)
  useEffect(() => {
    console.log(`selected note: `, selectedNote)
  }, [selectedNote])

  return (
    <div>
      <ToastContainer />
      <div className="w-max z-10 m-auto my-10 flex space-x-4">
        <div className='min-w-[250px] w-[20vw]'>
          <Header />
          <Body />
        </div>
        <NoteList />
      </div>
    </div>
  )
}
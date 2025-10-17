import Header from "./components/Header"
import Body from "./components/Body"
import { ToastContainer } from "react-toastify"
import NoteList from "./components/NoteList"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function App() {

  const [showNotes, setShowNotes] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  const { content, selectedNote } = useSelector(state => state.note)
  useEffect(() => {
    console.log(`selected note: `, selectedNote)
    console.log(`content: ${content}`)
  }, [selectedNote, content])

  const handleToggle = () => {
    if (showNotes) {
      setShowNotes(false);
    } else {
      setShouldRender(true);
      setShowNotes(true);
    }
  };

  const handleExitComplete = () => {
    setShouldRender(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="relative w-max z-10 m-auto my-10 flex space-x-4">
        <div className='min-w-[250px] w-[20vw]'>
          <Header toggle={handleToggle} />
          <Body />
        </div>
        {
          shouldRender &&
          <NoteList show={showNotes} toggle={handleToggle} onExitComplete={handleExitComplete} />
        }
      </div>
    </div>
  )
}
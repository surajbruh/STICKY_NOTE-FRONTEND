import Header from "./components/Header"
import Body from "./components/Body"
import { ToastContainer } from "react-toastify"
import NoteList from "./components/NoteList"

export default function App() {

  // TODO: ADD SEARCH BAR COMPONENTS.
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
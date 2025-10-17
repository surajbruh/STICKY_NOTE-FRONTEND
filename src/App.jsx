import Header from "./components/Header";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import NoteList from "./components/NoteList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// ✅ TODO updates handled: responsive + layout improvements + smooth animations

export default function App() {
  const [showNotes, setShowNotes] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const { content, selectedNote } = useSelector((state) => state.note);

  //FOR DEBUG PURPOSE
  useEffect(() => {
    console.log("selected note:", selectedNote);
    console.log("content:", content);
  }, [selectedNote, content]);

  const handleToggle = () => {
    if (showNotes) setShowNotes(false);
    else {
      setShouldRender(true);
      setShowNotes(true);
    }
  };

  const handleExitComplete = () => {
    setShouldRender(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center p-4 sm:p-6">
      <ToastContainer />
      <div
        className="
          relative 
          flex flex-col sm:flex-row 
          w-full max-w-3xl
          gap-4
          transition-all
          duration-300
        "
      >
        {/* Left Section */}
        <div className="flex-1 min-w-[350px] sm:w-[45%] lg:w-[35%] bg-transparent">
          <Header toggle={handleToggle} />
          <Body />
        </div>

        {/* Right Section (Note List) */}
        {shouldRender && (
          <NoteList
            show={showNotes}
            toggle={handleToggle}
            onExitComplete={handleExitComplete}
          />
        )}
      </div>
    </div>
  );
}

import Header from "./components/Header"
import Body from "./components/Body"

export default function App() {
  return (
    <div>
      <div className='m-auto my-10 min-w-[250px] w-[20vw]'>
        <Header />
        <Body />
      </div>
    </div>
  )
}
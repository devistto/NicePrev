import { HeaderComponent } from "./components/header";
import { SideBarCompoent } from "./components/sidebar";

function App() {

  return (
    <div className="bg-black w-screen h-screen px-20">
      <HeaderComponent />

      <div className="w-full h-[830px] py-5">
        <SideBarCompoent />
      </div>

    </div>
  )
}

export default App

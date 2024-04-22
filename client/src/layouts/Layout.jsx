import { Outlet} from "react-router-dom"
import Header from "../components/Header"

const Layout = () => {
  return (
    <div className="p-1 flex flex-col min-h-screen px-20 max-[800px]:px-10">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout
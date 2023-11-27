
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";



function Home() {
  return (
    <>
      <Navbar />
      <div className="outlet" style={{ marginTop: '60px' }}>
        <Outlet />


      </div>
      

    </>
  )
}

export default Home
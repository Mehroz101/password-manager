import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Layout = () => {
  return (
    <>
      <div className="root_layout">
          <Navbar />
        <div className="render_component">
          <Outlet />
        </div>
          <BottomNav />
        </div>
    </>
  );
};

export default Layout;

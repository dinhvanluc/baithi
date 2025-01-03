import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import './Layout.css';
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
            <div className="col-12">
              <Header />
            </div>

            <div className="col-12">
              <Menu />
            </div>

            <div className="col-12">
              <Outlet />
            </div>

            <div className="col-12">
              <Footer />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

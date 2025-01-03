import { NavLink } from "react-router";
import "./Menu.css";
import { useEffect, useState } from "react";

function Menu() {

  const [spGioHang, setSpGioHang] = useState([]);

  const handleThayDoiGioHang = () => {
    const valueStr = sessionStorage.getItem('GioHang');
    const valueJson = valueStr ? JSON.parse(valueStr) : [];
    setSpGioHang(valueJson)
  }

  useEffect(() => {
    document.addEventListener("ThayDoiGioHang", handleThayDoiGioHang, false);

    handleThayDoiGioHang();
  }, [])


  return (
    <div className="wrapper-menu">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <NavLink className={"nav-link"} to="/home">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className={"nav-link"} to="/products">
                Products
              </NavLink>
            </li>
          </ul>

          <form class="form-inline my-2 my-lg-0">
            <NavLink to="/shopping-cart">
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="button"
              >
                <div className="number-products">
                  {spGioHang?.length}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </button>
            </NavLink>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Menu;

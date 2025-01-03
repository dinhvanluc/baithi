import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

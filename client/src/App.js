import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Singin from "./pages/Auth/Singin";
import Singup from "./pages/Auth/Singup";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import ProtectedAdmin from "./pages/ProtectedAdmin";
import Home from "./pages/Admin/Home";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import NewProduct from "./pages/Admin/AdminProducts/new";

function App() {
  return (
    <Router>
      <Navbar />
      <div id="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/singin" element={<Singin />} />
          <Route path="/singup" element={<Singup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/basket" element={<Basket />} />
          </Route>
          <Route element={<ProtectedAdmin />}>
            <Route path="/admin" element={<Admin />}>
              <Route path="" element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<NewProduct />} />
              <Route path="products/:product_id" element={<AdminProductDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

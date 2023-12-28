import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/home/homepage";
import { LoginPage } from "./pages/account/login";
import { RegisterPage } from "./pages/account/register";
import { ProductPage } from "./pages/products/product-page";
import { ProductDetail } from "./pages/products/product-detail";
import { Dashboard } from "./pages/account/dashboard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveUser } from "./middlewares/auth-action";
// import { routes } from "./routes/index";

function App() {
  const dispatch = useDispatch();

  async function dispatcher() {
    try {
      const token = localStorage.getItem("auth");
      if (token) {
        await dispatch(receiveUser());
      }
    } catch (err) {}
  }
  useEffect(() => {
    dispatcher();
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="home" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="product-detail" element={<ProductDetail />} />
        <Route path="account" element={<Dashboard />} />
      </Routes>
      ;
    </>
  );
}

export default App;

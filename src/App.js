import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/home/homepage";
import { LoginPage } from "./pages/account/login";
import { RegisterPage } from "./pages/account/register";
import { ProductPage } from "./pages/products/product-page";
import { ProductDetail } from "./pages/products/product-detail";
// import { routes } from "./routes/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="home" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="product-detail" element={<ProductDetail />} />
      </Routes>
      ;
    </>
  );
}

export default App;

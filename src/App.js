import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/home/homepage";
import { LoginPage } from "./pages/account/login";
import { RegisterPage } from "./pages/account/register";
// import { routes } from "./routes/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="home" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      ;
    </>
  );
}

export default App;

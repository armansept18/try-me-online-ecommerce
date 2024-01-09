import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/routes";
import { useEffect, useState } from "react";
import { isTokenExpired } from "./middlewares/auth-action";
import { SessionExpired } from "./components/alert/alert";

function App() {
  const [sessionAlert, setSessionAlert] = useState(false);
  const handleTokenExpiration = () => {
    const token = localStorage.getItem("auth");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
      setSessionAlert(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  useEffect(() => {
    handleTokenExpiration();
  }, []);
  return (
    <>
      <SessionExpired
        onOpen={sessionAlert}
        onClose={() => setSessionAlert(false)}
      />
      <Routes>
        {routes.map((route, i) => (
          <Route {...route} key={i} />
        ))}
      </Routes>
      ;
    </>
  );
}

export default App;

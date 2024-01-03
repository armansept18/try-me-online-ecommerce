import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveUser } from "./middlewares/auth-action";
import { routes } from "./routes/routes";

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
        {routes.map((route, i) => (
          <Route {...route} key={i} />
        ))}
      </Routes>
      ;
    </>
  );
}

export default App;

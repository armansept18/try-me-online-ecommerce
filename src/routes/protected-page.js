import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { receiveUser } from "../middlewares/auth-middlewares";

export const ProtectedPage = ({ children, needLogin = false }) => {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const getUser = async () => {
    // await dispatch(receiveUser());
  };

  useEffect(() => {
    if (needLogin && !auth) {
      return nav("/login");
    } else if (needLogin && userSelector.role_id !== 1) {
      return nav("/cashier");
    } else return;
  }, [children, userSelector.id]);

  return children;
};

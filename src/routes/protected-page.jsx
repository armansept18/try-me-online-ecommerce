import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { receiveUser } from "../middlewares/auth-action";

export const ProtectedPage = ({
  children,
  needLogin = false,
  guestOnly = false,
}) => {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  const auth = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const getUser = async () => {
    await dispatch(receiveUser());
  };

  useEffect(() => {
    const checkAccess = async () => {
      await getUser();

      if (guestOnly && auth) {
        return setTimeout(() => {
          nav("/home");
        }, 500);
      } else if (needLogin && !auth) {
        return nav("/login");
      } else return;
    };
    checkAccess();
  }, [children, userSelector._id]);

  return children;
};

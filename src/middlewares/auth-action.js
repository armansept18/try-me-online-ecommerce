import { jwtDecode } from "jwt-decode";
import { api } from "../api/axios";
import { types } from "../redux/types";

export const receiveUser = () => {
  return async (dispatch) => {
    try {
      const { id } = jwtDecode(localStorage.getItem("auth"));
      const res = await api.get(`auth/check/${id}`);

      const user = res.data;

      dispatch({
        type: types.login,
        payload: user,
      });
    } catch (err) {
      console.log("Error Recieve User :", err);
    }
  };
};

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.post("auth/login", {
        ...values,
      });
      console.log("Login Submit :", res);

      const user = res.data.user;
      const token = res.data.token;
      localStorage.setItem("auth", token);
      dispatch({
        type: types.login,
        payload: user,
      });
      return types.success;
    } catch (err) {
      console.error("Error in userLogin:", err);
      localStorage.removeItem("auth");
      return err.message;
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({
      type: types.logout,
    });
  };
};

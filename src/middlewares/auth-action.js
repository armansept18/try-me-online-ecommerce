import { jwtDecode } from "jwt-decode";
import { api } from "../api/axios";
import { types } from "../redux/types";

export const receiveUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.log("Token is missing.");
        return;
      }
      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken._id) {
        console.error("Invalid or missing 'id' in decoded token.");
        return;
      }
      const userId = decodedToken._id;
      const res = await api.get(`auth/check/${userId}`);
      const user = res.data;
      dispatch({
        type: types.login,
        payload: user,
      });
    } catch (err) {
      console.error("Error receiving user:", err);
    }
  };
};

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.post("auth/login", {
        ...values,
      });

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

export const deleteUser = () => {
  return async (dispatch) => {
    try {
      const { id } = jwtDecode(localStorage.getItem("auth"));
      const res = await api.delete(`/auth/delete/${id}`);
      if (res.status === 200) {
        dispatch({
          type: types.logout,
        });
        localStorage.removeItem("auth");
        console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error in deleteUser: ", err);
    }
  };
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

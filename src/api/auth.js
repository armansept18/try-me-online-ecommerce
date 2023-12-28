import axios from "axios";

export const registerUser = async (data) => {
  return await axios.post(`${process.env.PORT}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${process.env.PORT}/auth/login`, data);
};

export const logoutUser = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .post(`${""}/auth/login`, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      localStorage.removeItem("auth");
      return res;
    });
};

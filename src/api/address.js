import axios from "axios";

export const getAddress = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${""}/api/delivery/addressess?limit=`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getLocation = async (location, code) => {
  return await axios.get(
    `https://regions-indonesia.herokuapp.com/api/${location}?kode_induk=${code}`
  );
};

export const createAddress = async (data) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${""}/api/delivery-addresses`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

import axios from "axios";
import { api } from "./axios";

export const getAddress = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("auth"));
    console.log("Token in getAddress:", token);
    if (!token) {
      console.error("Token is missing");
      return;
    }
    const response = await api.get(`/api/delivery-addresses`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("Response getAddress:", response);
    return response;
  } catch (error) {
    console.error("Error fetching addresses in getAddress:", error);
    throw error;
  }
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

  return await axios.post(
    `${process.env.PORT || "localhost:5000"}/api/delivery-addresses`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

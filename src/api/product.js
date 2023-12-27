import axios from "axios";

export const getAllProduct = async (params) => {
  return await axios.get(`${""}/api/products`, { params });
};
export const getProductId = async (id) => {
  return await axios.get(`${""}/api/products/${id}`);
};
export const getCatgories = async () => {
  return await axios.get(`${""}/api/categories`);
};
export const getTagsByCategory = async (params) => {
  return await axios.get(`${""}/api/tags/${params}`);
};

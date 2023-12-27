import axios from "axios";

export const createOrder = async (payload) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${""}/api/orders`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getInvoiceByOrderId = async (order_id) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios.get(`${""}/api/invoices/${order_id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getOrders = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${""}/api/orders?limit=`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

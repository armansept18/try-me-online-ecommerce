import axios from "axios";

export const saveCart = async (token, cart) => {
  return await axios.put(
    `${""}/api/carts`,
    { items: cart },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
};

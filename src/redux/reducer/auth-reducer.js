import { types } from "../types";

const init_state = {
  _id: "",
  full_name: "",
  customer_id: 0,
  email: "",
  role: "user",
};

export const userReducer = (state = init_state, action) => {
  if (action.type === types.login) {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === types.logout) {
    return init_state;
  }
  return state;
};

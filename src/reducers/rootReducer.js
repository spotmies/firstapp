import { loadState, saveState } from "../helpers/localStorage";
const initState = {
  userDetails: {},
  orders: [],
  quotes: [],
  logs: [],
  messages: [],
  isUserLogin: false,
  feedbackQuestion: {},
};
const rootReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_NEW_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.value],
      };
    case "UPDATE_ALL_ORDERS":
      return {
        ...state,
        orders: action.value,
      };
    case "DELETE_ORDER":
      let newOrders = state.orders.filter((order) => {
        return order.ordId !== action.value;
      });
      return {
        ...state,
        orders: newOrders,
      };
    case "UPDATE_USER_DETAILS":
      saveState("userDetails", action.value);
      return {
        ...state,
        userDetails: action.value,
        isUserLogin: true,
      };

    default:
      return state;
  }
};
export default rootReducer;

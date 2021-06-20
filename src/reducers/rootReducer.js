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
      saveState("orders", action.value);
      return {
        ...state,
        orders: action.value,
      };
    case "DELETE_ORDER":
      let newOrders = state.orders.filter((order) => {
        return order.ordId !== action.value;
      });
      saveState("orders", newOrders);
      return {
        ...state,
        orders: newOrders,
      };
    case "UPDATE_ORDER":
      const index = state.orders.findIndex(
        (order) => order.ordId == action.value.ordId
      ); //finding index of the item
      console.log(index);
      const newArray = [...state.orders]; //making a new array
      newArray[index] = action.value; //changing value in the new array
      saveState("orders", newArray);
      return {
        ...state, //copying the orignal state
        orders: newArray, //reassingning todos to new array
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

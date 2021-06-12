import { loadState, saveState } from "../helpers/localStorage";
const initState = {
  userDetails: {},
  myBookings: [],
  quotes: [],
  logs: [],
  messages: [],
  isUserLogin: false,
  feedbackQuestion: {},
};
const rootReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_NEW_BOOK":
      return {
        ...state,
        myBookings: [...state.myBookings, action.value],
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

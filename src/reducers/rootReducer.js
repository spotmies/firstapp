import { loadState, saveState } from "../helpers/localStorage";
const initState = {
  userDetails: {},
  orders: [],
  responses: [],
  logs: [],
  userChats: [],
  isUserLogin: false,
  feedbackQuestion: [],
  currentMapAddress: "",
  jobPostLocation: { lat: 17.686815, lng: 83.218483 },
};

const rootReducer = (state = initState, action) => {
  // console.log(action);

  const chatingRoot = {
    updateAllChats: function () {
      return {
        ...state,
        userChats: action.value,
      };
    },
    addNewMessage: function () {
      // console.log(action.value);
      let msgId = action.value.target.msgId;
      let targetConversasion = state.userChats.find(
        (element) => element.msgId === msgId
      );
      let tempAllChats = state.userChats.filter(
        (elements) => elements.msgId !== msgId
      );

      targetConversasion["msgs"].push(action.value.object);
      // console.log(targetConversasion);
      tempAllChats = [...tempAllChats, targetConversasion];
      // tempAllChats = [].concat(tempAllChats).reverse();

      tempAllChats.sort(function (x, y) {
        return (
          JSON.parse(y.msgs[y.msgs.length - 1]).time -
          JSON.parse(x.msgs[x.msgs.length - 1]).time
        );
      });

      return {
        ...state,
        userChats: tempAllChats,
      };
    },
  };
  switch (action.type) {
    case "ADD_NEW_MESSAGE":
      return chatingRoot.addNewMessage();
    case "UPDATE_ALL_CHATS":
      return chatingRoot.updateAllChats();
    // return {
    //   ...state,
    //   userChats: action.value,
    // };

    case "ADD_NEW_RESPONSE":
      //need to add load state herhe
      return {
        ...state,
        responses: [...state.responses, action.value],
      };
    case "UPDATE_ALL_RESPONSES":
      return {
        ...state,
        responses: action.value,
      };

    case "DELETE_RESPONSE":
      let newResponses = state.responses.filter((response) => {
        return response.responseId !== action.value;
      });
      return {
        ...state,
        responses: newResponses,
      };

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
        (order) => order.ordId === action.value.ordId
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

    case "UPDATE_FEEDBACK_QUESTIONS":
      saveState("feedbackQuestion", action.value);
      return {
        ...state,
        feedbackQuestion: action.value,
      };
    case "UPDATE_CURRENT_MAP_ADDRESS":
      return {
        ...state,
        currentMapAddress: action.value,
      };
    case "UPDATE_JOB_POST_LOCATION":
      console.log("updating postloc", action.value);
      return {
        ...state,
        jobPostLocation: action.value,
      };

    default:
      return state;
  }
};
export default rootReducer;

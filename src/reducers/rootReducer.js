import { apiGetMethod, apiPostPut } from "../api_services/api_calls/api_calls";
import { api } from "../helpers/constants";
import { getNewTimeStamp } from "../helpers/convertions";
import { loadState, saveState } from "../helpers/localStorage";
const initState = {
  userDetails: {},
  orders: [],
  responses: [],
  logs: [],
  userChats: [],
  isUserLogin: false,
  feedbackQuestion: [],
  currentMapAddress: {},
  jobPostLocation: { lat: 17.686815, lng: 83.218483 },
  editOrderData: {},
  universalLoader: false,
  isupdateMapAddress: true,
  disableChatResponseTab: false,
  disableBottomBar: true,
  bottomBarState: "",
  sendMessageQueue: [],
  readyToSendMessage: true,
  sendRemaingMessages: true,
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
    readReceipt: function (msgId, readState, messageQueue) {
      // console.log(action.value);

      let targetConversasion = state.userChats.find(
        (element) => element.msgId === msgId
      );
      let tempAllChats = state.userChats.filter(
        (elements) => elements.msgId !== msgId
      );
      if (state.sendMessageQueue.length < 2)
        targetConversasion["uState"] = readState;

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
        sendMessageQueue: messageQueue ?? state.sendMessageQueue,
        sendRemaingMessages: !state.sendRemaingMessages,
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
      console.log(targetConversasion.uState);
      targetConversasion.uState = 0;
      console.log(targetConversasion.uState);
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
  const responseRoot = {
    acceptRejectResponse: async function (respId, respType) {
      console.log(action.value);

      let index = state.responses.findIndex(
        (element) => element.responseId === respId
      );
      if (index < 0) {
        console.log("unable to find response");
        return {
          ...state,
          response: state.responses,
        };
      }
      let responseData = state.responses[index];
      let body = {
        deviceToken: responseData?.pDetails?.partnerDeviceToken,
        notificationTitle: "Your order alert",
      };
      if (respType == "accept") {
        body.responseType = respType;
        body.ordId = responseData?.orderDetails.ordId;
        body.pId = responseData?.pId;
        body.uId = responseData?.orderDetails?.uId;
        body.orderState = "8";
        body.acceptBy = "user";
        body.acceptAt = getNewTimeStamp();
        body.acceptResponse = responseData?._id;
        body.pDetails = responseData?.pDetails?._id;
        body.userName = state.userDetails?.name;
        body.userPic = state.userDetails?.pic;
        body.notificationBody = `${state.userDetails?.name} accepted your request start your service`;
      } else {
        body.responseType = respType;
        body.acceptResponse = responseData._id;
        body.notificationBody = `${state.userDetails?.name} Rejected your request`;
      }
      // turn on loader
      let response = await apiPostPut(body, api.confirmDeclineOrder, "POST");
      if (response != null) {
        let filterResponses = state.responses.filter(
          (element) => element._id !== responseData._id
        );
        if (respType !== "accept") {
          return {
            ...state,
            responses: filterResponses,
          };
        }
        let updateOrder = await apiGetMethod(
          api.ORDER_DETAILS + "/" + responseData?.orderDetails?.ordId
        );
        if (updateOrder != null) {
          return {
            ...state,
            orders: [...state.orders, updateOrder],
            responses: filterResponses,
          };
        }
        return {
          ...state,
          responses: filterResponses,
        };
      } else {
        alert("Something went wrong 2");
        return {
          ...state,
        };
      }
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
    case "ACCEPT_RESPONSE":
      responseRoot.acceptRejectResponse(action.value, "accept");
    case "REJECT_RESPONSE":
      responseRoot.acceptRejectResponse(action.value, "reject");

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
    // case "UPDATE_ORDER_STATE":
    //   let tempOrders = state.orders;
    //   let oindex = tempOrders.findIndex(
    //     (order) => order.ordId == action.value.ordId
    //   );
    //   tempOrders[oindex].orderState = action.value.orderState;
    //   saveState("orders", tempOrders);
    //   return {
    //     ...state,
    //     orders: tempOrders,
    //   };
    case "UPDATE_ORDER":
      const index = state.orders.findIndex(
        (order) => order.ordId === action.value.ordId
      ); //finding index of the item
      if (index < 0) return;
      const newArray = [...state.orders]; //making a new array
      console.log(newArray[index]);
      const mergedOrder = {
        ...newArray[index],
        ...action.value,
      };
      console.log(mergedOrder);
      newArray[index] = mergedOrder; //changing value in the new array
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
    case "IS_UPDATE_MAP_ADDRESS":
      return {
        ...state,
        isupdateMapAddress: action.value,
      };
    case "UPDATE_JOB_POST_LOCATION":
      return {
        ...state,
        jobPostLocation: action.value,
      };
    case "EDIT_ORDER_DATA":
      return {
        ...state,
        editOrderData: action.value,
      };
    case "UPDATE_UNIVERSAL_LOADER":
      return {
        ...state,
        universalLoader: action.value,
      };
    case "DISABLE_CHAT_RESPONSE_TAB":
      return {
        ...state,
        disableChatResponseTab: action.value,
      };
    case "DISABLE_BOTTOM_BAR":
      return {
        ...state,
        disableBottomBar: action.value,
      };
    case "UPDATE_BOTTOM_BAR_STATE":
      return {
        ...state,
        bottomBarState: action.value,
      };
    case "ADD_MESSAGE_TO_QUEUE":
      return {
        ...state,
        sendMessageQueue: [...state.sendMessageQueue, action.value],
      };
    case "ADD_NEW_CHAT":
      return {
        ...state,
        userChats: [...state.userChats, action.value],
      };

    case "REMOVE_MESSAGE_FROM_QUEUE":
      let filtered = state.sendMessageQueue.filter(function (value) {
        return value != action.value;
      });
      return chatingRoot.readReceipt(action.value.target.msgId, 1, filtered);
    //   let filtered = state.sendMessageQueue.filter(function(value){
    //     return value != action.value;
    // });
    //   return {
    //     ...state,
    //     sendMessageQueue:filtered
    //   }
    case "READY_TO_SEND_MESSAGE":
      return {
        ...state,
        readyToSendMessage: action.value,
      };
    case "SEND_REMAINING_MESSAGES":
      return {
        ...state,
        sendRemaingMessages: !state.sendRemaingMessages,
      };

    default:
      return state;
  }
};
export default rootReducer;

import constants from "../../../helpers/constants";
import {
  apiDelMethod,
  apiGetMethod,
  apiPostPut,
} from "../../../api_services/api_calls/api_calls";
import { getNewTimeStamp } from "../../../helpers/convertions";

export async function getConversasions(uId) {
  let path = constants.api.USER_CHATS + `/${uId}`;
  let response = await apiGetMethod(path);
  if (response === null) {
    let emptyArr = [];
    return emptyArr;
  }
  return response;
}

export async function createNewChat({
  ordId,
  uId,
  pId,
  uDetails,
  pDetails,
  orderDetails,
} = {}) {
  console.log("creating new chatingg,,,,,");
  const msgId = getNewTimeStamp();
  const body = {
    msgId: msgId,
    msgs: `{"msg":"New Chat Created for this service","type":"text","sender":"bot","time":${msgId}}`,
    ordId: ordId,
    pId: pId,
    uId: uId,
    uDetails: uDetails,
    pDetails: pDetails,
    orderDetails: orderDetails,
  };

  let response = await apiPostPut(body, constants.api.CREATE_NEW_CHAT, "POST");
  if (response === null) {
    alert("Something went wrong while creating chat");
  }
  return response;
}

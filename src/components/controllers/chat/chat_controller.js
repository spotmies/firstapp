import constants from "../../../helpers/constants";
import {
  apiDelMethod,
  apiGetMethod,
  apiPostPut,
} from "../../../api_services/api_calls/api_calls";

export async function getConversasions(uId) {
  let path = constants.api.USER_CHATS + `/${uId}`;
  let response = await apiGetMethod(path);
  if (response === null) {
    let emptyArr = [];
    return emptyArr;
  }
  return response;
}

import constants from "../../../helpers/constants";
import {
  apiGetMethod,
  apiPostPut,
} from "../../../api_services/api_calls/api_calls";

export async function checkUser(uId) {
  let path = constants.api.USER_DETAILS + `/${uId}`;
  let response = await apiGetMethod(path);
  console.log(response);
  if (response == null) return false;
  return response;
}

export async function newUser(userObject) {
  let newUserObj = {
    name: userObject.user.name,
    phNum: userObject.user.phoneNumber,
    userState: "active",
    join: new Date().valueOf(),
    uId: userObject.user.uid,
  };
  console.log(newUserObj);
  let response = await apiPostPut(newUserObj, constants.api.NEW_USER);
  console.log(response);
  if (response != null) {
    return response;
  }
  return null;
}

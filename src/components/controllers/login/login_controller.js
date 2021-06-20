import constants from "../../../helpers/constants";
import {
  apiGetMethod,
  apiPostPut,
} from "../../../api_services/api_calls/api_calls";

export async function loginUser(uId) {
  let obj = {
    lastLogin: new Date().valueOf(),
  };
  let path = constants.api.USER_DETAILS + `/${uId}`;
  let response = await apiPostPut(obj, path, "PUT");
  if (response == null) return false;
  return response;
}

export async function updateUserDetails(uId, updateObject) {
  let path = constants.api.USER_DETAILS + `/${uId}`;
  let response = await apiPostPut(updateObject, path, "PUT");
  console.log(response);
  if (response == null) return false;
  return response;
}

export async function newUser(userObject) {
  let newUserObj = {
    name: userObject.user.name,
    phNum: userObject.user.phoneNumber.substring(3),
    userState: "active",
    join: new Date().valueOf(),
    uId: userObject.user.uid,
  };
  console.log(newUserObj);
  let response = await apiPostPut(newUserObj, constants.api.NEW_USER, "POST");
  console.log(response);
  if (response != null) {
    return response;
  }
  return null;
}

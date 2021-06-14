import constants from "../../../helpers/constants";
import {
  apiGetMethod,
  apiPostPut,
} from "../../../api_services/api_calls/api_calls";

/* -------------------------------------------------------------------------- */
/*                              CREATE NEW ORDER                              */
/* -------------------------------------------------------------------------- */
export async function createNewServiceRequest(uId, reqObj) {
  let path = constants.api.CREATE_ORDER + `/${uId}`;
  let response = await apiPostPut(reqObj, path, "POST");
  console.log(response);
  if (response == null) return false;
  return response;
}

/* -------------------------------------------------------------------------- */
/*                               GET USER ORDERS                              */
/* -------------------------------------------------------------------------- */
export async function getUserOrders(uId) {
  console.log("getuserorders");
  let path = constants.api.USER_ORDERS + `/${uId}`;
  let response = await apiGetMethod(path);
  if (response == null) return null;
  return response;
}

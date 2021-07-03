import constants from "../../../helpers/constants";
import {
  apiDelMethod,
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
  if (response === null) return false;
  return response;
}

/* -------------------------------------------------------------------------- */
/*                                UPDATE ORDER                                */
/* -------------------------------------------------------------------------- */
export async function updateOrder(ordId, reqObj) {
  let path = constants.api.ORDER_DETAILS + `/${ordId}`;
  let response = await apiPostPut(reqObj, path, "PUT");
  console.log(response);
  if (response === null) return false;
  return response;
}

/* -------------------------------------------------------------------------- */
/*                               GET USER ORDERS                              */
/* -------------------------------------------------------------------------- */
export async function getUserOrders(uId) {
  console.log("getuserorders");
  let path = constants.api.USER_ORDERS + `/${uId}`;
  let response = await apiGetMethod(path);
  if (response === null) {
    let emptyArr = [];
    return emptyArr;
  }
  return response;
}

/* -------------------------------------------------------------------------- */
/*                            DELETE ORDER BY ordId                           */
/* -------------------------------------------------------------------------- */
export async function deleteOrderById(ordId) {
  let path = constants.api.ORDER_DETAILS + `/${ordId}`;
  let response = await apiDelMethod(path);
  if (response === true) return true;
  return response;
}

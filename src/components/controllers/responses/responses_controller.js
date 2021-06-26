import constants from "../../../helpers/constants";
import {
  apiDelMethod,
  apiGetMethod,
  apiPostPut,
} from "../../../api_services/api_calls/api_calls";

/* -------------------------------------------------------------------------- */
/*                         GET RESPONSES FROM PARTNERṢ                        */
/* -------------------------------------------------------------------------- */
export async function getResponses(uId) {
  let path = constants.api.USER_RESPONSES + `/${uId}`;
  let response = await apiGetMethod(path);
  if (response == null) {
    let emptyArr = [];
    return emptyArr;
  }
  return response;
}

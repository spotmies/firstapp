import { addHeader, addHeaderWithOutBody } from "../headers/header";
import constants from "../../helpers/constants";
import { createStore } from "redux";
import rootReducer from "../../reducers/rootReducer";
const store = createStore(rootReducer);
function testAction(loaderState) {
  return {
    type: "UPDATE_UNIVERSAL_LOADER",
    value: loaderState,
  };
}
export async function apiGetMethod(path) {
  // store.dispatch(testAction(true));
  // console.log("store", rootReducer);
  const response = await fetch(
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path,
    await addHeaderWithOutBody("GET")
  );
  console.log(response);
  //   return response;
  // store.dispatch(testAction(false));
  if (response.status === 200 || response.status === 304) {
    const data = await response.json();
    return data;
  } else return null;
}

export async function apiGetOpenSource(uriPath) {
  const response = await fetch(uriPath, await addHeaderWithOutBody("GET"));
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else return null;
}

export async function apiDelMethod(path) {
  const response = await fetch(
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path,
    await addHeaderWithOutBody("DELETE")
  );
  console.log(response);
  //   return response;
  if (response.status === 204 || response.status === 200) {
    return true;
  } else return false;
}

export async function apiPostPut(body, path, method) {
  const uri =
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path;
  const response = await fetch(uri, await addHeader(body, method));
  if (response.status === 204) return true;
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else return null;
}

export async function newSuggestionRequest(body) {
  const uri = constants.api.new_suggestion;
  let newBody = body;
  newBody.suggestionFrom = "userWeb";
  const response = await apiPostPut(body, uri, "POST");
  if (response != null) return true;
  return false;
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoader: (data) => {
      dispatch({ type: "UPDATE_UNIVERSAL_LOADER", value: data });
    },
  };
};

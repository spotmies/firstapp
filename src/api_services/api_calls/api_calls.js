import { addHeader, addHeaderWithOutBody } from "../headers/header";
import constants from "../../helpers/constants";
import firebase from "../../firebase";
import { loadState, saveState } from "../../helpers/localStorage";

async function getAccessToken() {
  console.log("getting access token>>>>>>>>>");
  if (
    !firebase.auth().currentUser == null ||
    firebase.auth().currentUser == undefined
  ) {
    return null;
  }
  const uri = constants.baseUrl + constants.api.access_token;
  const body = {
    uId: firebase.auth().currentUser.uid,
  };
  const response = await fetch(uri, await addHeader(body, "POST", ""));
  if (response.status == 200) {
    const result = await response.json();
    console.log("result>>>", result);
    saveState("accessToken", result);
    return result;
  }
  return null;
}

async function fetchAccessToken() {
  const savedToken = loadState("accessToken");
  const currentTime = Math.round(new Date().getTime() / 1000);
  if (savedToken == null || savedToken?.authData?.exp <= currentTime) {
    const tokenData = await getAccessToken();
    if (tokenData != null) {
      return tokenData?.token;
    }
    return "null";
  }
  return savedToken.token.toString();
}

export async function apiGetMethod(path) {
  const token = await fetchAccessToken();
  const response = await fetch(
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path,
    await addHeaderWithOutBody("GET", token)
  );
  console.log(response);
  //   return response;
  // store.dispatch(testAction(false));
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else return null;
}

export async function apiDelMethod(path) {
  const token = await fetchAccessToken();
  const response = await fetch(
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path,
    await addHeaderWithOutBody("DELETE", token)
  );
  console.log(response);
  //   return response;
  if (response.status === 204 || response.status === 200) {
    return true;
  } else return false;
}

export async function apiPostPut(body, path, method) {
  const token = await fetchAccessToken();
  const uri =
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path;
  const response = await fetch(uri, await addHeader(body, method, token));
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

export async function apiGetOpenSource(uriPath) {
  const token = await fetchAccessToken();
  const response = await fetch(
    uriPath,
    await addHeaderWithOutBody("GET", token)
  );
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else return null;
}

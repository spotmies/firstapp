import { addHeader, addHeaderWithOutBody } from "../headers/header";
import constants from "../../helpers/constants";

export async function apiGetMethod(path) {
  const response = await fetch(
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path,
    await addHeaderWithOutBody("GET")
  );
  console.log(response);
  //   return response;
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
  if (response.status === 204) {
    return true;
  } else return false;
}

export async function apiPostPut(body, path, method) {
  const uri =
    (constants.constants.localBacked
      ? constants.localHostUrl
      : constants.baseUrl) + path;
  const response = await fetch(uri, await addHeader(body, method));
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else return null;
}

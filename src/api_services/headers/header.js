export async function addHeader(requestObj, methodType, token) {
  const requestOptions = {
    method: methodType,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  };
  return requestOptions;
}

export async function addHeaderWithOutBody(methodType, token) {
  const requestOptions = {
    method: methodType,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return requestOptions;
}

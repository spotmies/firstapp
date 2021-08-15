import { apiGetMethod } from "../../../api_services/api_calls/api_calls";

export async function searchLocation(locationName) {
  let apiPath = `/geocode/addressLine/${locationName}?limit=5`;
  let response = await apiGetMethod(apiPath);
  return response;
}

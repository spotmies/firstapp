import { apiGetOpenSource } from "../../api_services/api_calls/api_calls";

async function reverseGeocode({ lat, long }) {
  const uriPath = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`;
  const addressObject = await apiGetOpenSource(uriPath);
  return addressObject;
}

export { reverseGeocode };

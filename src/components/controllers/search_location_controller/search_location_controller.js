import {
  apiGetMethod,
  apiGetOpenSource,
} from "../../../api_services/api_calls/api_calls";

function highlightFilter(searchString, listOfData) {
  let targetString = searchString.toLowerCase();
  var strRegExPattern = targetString;
  let filterArray = listOfData;
  listOfData.forEach((element, key) => {
    element.addressLine = element.addressLine.toLowerCase();
    let splitResult = element.addressLine.split(",");
    splitResult.forEach((word, word_key) => {
      // let trimWord = word.split(" ").join("");

      let fullTargetWord = word.match(new RegExp(strRegExPattern));

      if (fullTargetWord != null) {
        filterArray[key].remainingAddress = filterArray[
          key
        ].addressLine.replace(fullTargetWord.input, "");
        filterArray[key].fullTargetWord = fullTargetWord.input;
        filterArray[key].searchTargetWord = targetString;

        let index = fullTargetWord.index + targetString.length;
        let index2 = fullTargetWord.index - 1;

        if (fullTargetWord.input[index] == " ") {
          // console.log("is space", fullTargetWord.input[index2]);
          filterArray[key].remaingTargetWord = fullTargetWord.input.replace(
            targetString,
            ""
          );
        } else {
          filterArray[key].remaingTargetWord = fullTargetWord.input
            .replace(targetString, "")
            .trim();
        }
      }
    });
  });
  console.log("filterd array", filterArray);
  return filterArray;
}
function convertGeoObject(arrayOfgeoObject) {
  if (arrayOfgeoObject.length < 1) return arrayOfgeoObject;
  let arrayOfconvertedObject = [];
  arrayOfgeoObject.forEach((geoObject, key) => {
    let convertedObject = {};
    convertedObject.addressLine = geoObject.display_name;
    convertedObject.adminArea = geoObject.address.state ?? "";
    convertedObject.coordinates = {
      latitude: geoObject.lat,
      logitude: geoObject.lon,
    };
    convertedObject.featureName = geoObject.address.road ?? "";
    convertedObject.locality = geoObject.county ?? "";
    convertedObject.postalCode = geoObject.address.postcode ?? "";
    convertedObject.subAdminArea = geoObject.address.state_district ?? "";
    convertedObject.subLocality =
      geoObject.address.town ?? geoObject.address.road ?? "";
    convertedObject.originObject = geoObject;
    arrayOfconvertedObject.push(convertedObject);
  });
  return arrayOfconvertedObject;
}

export async function searchLocation(locationName) {
  let apiPath = `/geocode/addressLine/${locationName}?limit=7`;
  let response = await apiGetMethod(apiPath);
  if (response.length < 1) {
    response = await deepSearchLocation(locationName);
  }
  // let response = await deepSearchLocation(locationName);
  let filterResult = highlightFilter(locationName, response);

  return filterResult;
}

export async function deepSearchLocation(locationName) {
  let uriPath = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=10&namedetails=1&countrycodes=in&bounded=1&viewbox=83.087737,17.538455,83.41598,17.934493&q=${locationName}&limit=10`;
  const addressObject = await apiGetOpenSource(uriPath);
  const convertedAddressObject = convertGeoObject(addressObject);
  return convertedAddressObject;
}

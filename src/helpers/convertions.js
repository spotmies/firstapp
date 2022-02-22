function getQuery(variable) {
  var query = window.location.search.substring(1);
  //   console.log(query); //"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  //   console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

const getNewTimeStamp = () => {
  const timestamp = Math.round(new Date().valueOf());
  return timestamp;
};

const serviceReqAddressConvert = (address) => {
  // let dummy = {
  //   subLocality: "Madhavadhara",
  //   locality: "Visakhapatnam",
  //   latitude: "17.748195",
  //   logitude: "83.261978",
  //   addressLine:
  //     "39-8-27, Muralinagar, Madhavadhara, Visakhapatnam, Andhra Pradesh 530018, India",
  //   subAdminArea: "Vishakhapatnam",
  //   postalCode: "530018",
  //   adminArea: "Andhra Pradesh",
  //   subThoroughfare: "null",
  //   featureName: "39-8-27",
  //   thoroughfare: "null",
  // };
  let newAddressObj = {
    subLocality: address?.address?.suburb,
    locality: address?.address?.city,
    latitude: address?.lat,
    logitude: address?.lon,
    name: address?.name ?? address?.address?.display_name,
    street: address?.address?.neighbourhood,
    subAdminArea: address?.address?.state_district,
    postalCode: address?.address?.postcode,
    adminArea: address?.address?.state,
    isoCountrycode: address?.address?.country_code,
    from: "web",
  };
  return newAddressObj;
};

const getbookingLocation = (location) => {
  const parsedLocation = JSON.parse(location);
  return `${parsedLocation?.street ?? ""}`;
};
const getbookingLocation2 = (location) => {
  try {
    const parsedLocation = JSON.parse(location);
    return `${parsedLocation?.street} ${parsedLocation?.locality}`;
  } catch (error) {
    return "";
  }
};

const getRating = (ratings) => {
  try {
    if (ratings.length < 1) return "0";
    let sum = 0;
    for (let i = 0; i < ratings?.length; i++) {
      sum += ratings[i]?.rating;
    }
    let avg = sum / ratings?.length;
    return (avg / 20).toFixed(1);
  } catch (error) {
    console.log(error);
    return "*";
  }
};
const getRatingPercent = (ratings) => {
  //average rating
  console.log(ratings);
  try {
    if (ratings.length < 1) return 0;
    let sum = 0;
    for (let i = 0; i < ratings?.length; i++) {
      sum += ratings[i]?.rating;
    }
    let avg = sum / ratings?.length;
    return avg;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const professionNRating = (pDetails) => {
  console.log("pDetails:", pDetails);
  try {
    let profession =
      pDetails?.accountType === "business"
        ? pDetails?.businessName
        : pDetails?.accountType;
    let rating = getRating(pDetails?.rate);
    return `${profession} | ${rating}`;
  } catch (error) {
    return "";
  }
};
const getIdFromUrl = () => {
  let id = window.location.pathname.split("/")[2];
  if (id === undefined || id === null || id === "") return "null";
  return id;
};

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
  try {
    const toRad = (Value) => {
      return (Value * Math.PI) / 180;
    };
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(1);
  } catch (error) {
    return "";
  }
}

// Converts numeric degrees to radians

export {
  getQuery,
  getNewTimeStamp,
  serviceReqAddressConvert,
  getRating,
  professionNRating,
  getIdFromUrl,
  getRatingPercent,
  getbookingLocation,
  getbookingLocation2,
  distanceBetweenCoordinates,
};

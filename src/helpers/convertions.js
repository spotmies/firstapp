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
    name: address?.name,
    street: address?.neighbourhood,
    subAdminArea: address?.address?.state_district,
    postalCode: address?.address?.postcode,
    adminArea: address?.address?.state,
    isoCountrycode: address?.address?.country_code,
  };
  return newAddressObj;
};
export { getQuery, getNewTimeStamp, serviceReqAddressConvert };

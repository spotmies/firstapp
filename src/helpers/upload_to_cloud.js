function getFileUrl(filename) {
  //create a storage reference
  var storage = firebase.storage().ref(filename);

  //get file url
  storage
    .getDownloadURL()
    .then(function (url) {
      console.log(url);
    })
    .catch(function (error) {
      console.log("error encountered");
    });
}

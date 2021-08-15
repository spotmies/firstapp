import { apiGetMethod } from "../../../api_services/api_calls/api_calls";

function highlightFilter(targetString, listOfData) {
  var strRegExPattern = targetString;
  let filterArray = listOfData;
  listOfData.forEach((element, key) => {
    let splitResult = element.addressLine.split(",");
    splitResult.forEach((word, word_key) => {
      // let trimWord = word.split(" ").join("");

      let fullTargetWord = word.match(new RegExp(strRegExPattern));

      if (fullTargetWord != null) {
        console.log(fullTargetWord);
        filterArray[key].remainingAddress = filterArray[
          key
        ].addressLine.replace(fullTargetWord.input, "");
        filterArray[key].fullTargetWord = fullTargetWord.input;
        filterArray[key].searchTargetWord = targetString;

        let index = fullTargetWord.index + targetString.length;
        let index2 = fullTargetWord.index - 1;

        if (fullTargetWord.input[index] == " ") {
          console.log("is space", fullTargetWord.input[index2]);
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
      // console.log(word.match(/vuda col/));
    });
  });
  console.log("filterd array", filterArray);
  return filterArray;
}

export async function searchLocation(locationName) {
  let apiPath = `/geocode/addressLine/${locationName}?limit=7`;
  let response = await apiGetMethod(apiPath);
  let filterResult = highlightFilter(locationName, response);
  return filterResult;
}

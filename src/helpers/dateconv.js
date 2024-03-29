function lastMessage(msg) {
  if (msg.slice(msg.length - 1) === "u" || msg.slice(msg.length - 1) === "um") {
    return true;
  } else {
    return false;
  }
}

// function jsonParser(obj) {

//   // console.log(JSON.parse(obj));

//   return "hello";
// }

function gettbystamps(stamps, id) {
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //today
  let today = new Date();
  let tday = today.getDay(); //return day sun=0;mon=1...
  let tthedate = today.getDate(); //returns date 1,2,3,4..
  let tmonth = today.getMonth();

  let yesterday = today;
  yesterday.setDate(yesterday.getDate() - 1);
  let yday = yesterday.getDay(); //return day sun=0;mon=1...
  let ythedate = yesterday.getDate(); //returns date 1,2,3,4..
  let ymonth = yesterday.getMonth();

  let date = new Date(stamps);
  // let year = date.getFullYear();
  let month = date.getMonth();
  let thedate = date.getDate();
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const formatAMPM = (date) => {
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const fullDate = () => {
    let temp = dayName[day] + " " + thedate + " " + monthNames[month];
    let temp2 = dayName[tday] + " " + tthedate + " " + monthNames[tmonth];
    let temp3 = dayName[yday] + " " + ythedate + " " + monthNames[ymonth];
    if (temp === temp2) return "Today";
    else if (temp === temp3) return "Yesterday";
    else return temp;
  };

  switch (id) {
    case "strmonth":
      return monthNames[month];

    case "strday":
      return dayName[day];
    case "date":
      return thedate;
    // case "strmonth":
    //   return dayName[day];

    case "hours":
      return hours;
    case "minutes":
      return minutes;
    case "time":
      return formatAMPM();
    case "fulldate":
      return fullDate();
    default:
      return "invalid id";
  }
}
function countSpecial(str) {
  const punct = "`";
  let count = 0;
  let position = [];
  for (let i = 0; i < str.length; i++) {
    if (!punct.includes(str[i])) {
      continue;
    }
    count++;
    position.push(i);
  }
  return position;
}
function getorgnl(msg) {
  let temp = countSpecial(msg);
  let temp2 = msg.slice(0, temp[temp.length - 2]);
  return temp2;
}
function getstamp(raw) {
  let temp = countSpecial(raw);
  let findex = temp[temp.length - 2] + 1;
  let temp2 = raw.substring(findex, temp[temp.length - 1]);
  return temp2;
}

function validURL(str) {
  var regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  if (!regex.test(str)) return false;

  return true;
}

function getFileType(file) {
  if (file === undefined || file === null || file === false || file === "")
    return "null";
  console.log("sgsdfads", file);
  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };
  if (validURL(file)) {
    switch (getUrlExtension(file)) {
      case "jpg":
      case "png":
      case "PNG":
      case "jpeg":
      case "webp":
      case "bmp":
      case "gif":
      case "jpe":
      case "jif":
      case "jfif":
      case "jfi":
      case "tiff":
      case "tif":
      case "raw":
      case "arw":
      case "cr2":
      case "nrw":
      case "k25":
      case "dib":
      case "heif":
      case "heic":
      case "svg":
      case "svgz":
        return "img";
      case "mkv":
      case "webm":
      case "flv":
      case "vob":
      case "ogv":
      case "ogg":
      case "drc":
      case "gifv":
      case "mng":
      case "avi":
      case "mov":
      case "webm":
      case "qt":
      case "wmv":
      case "yuv":
      case "rm":
      case "rmvb":
      case "m4p":
      case "amv":
      case "mpeg":
      case "nsv":
      case "3gp":
      case "3g2":
      case "mxf":
      case "flv":
      case "f4v":
      case "f4p":
      case "f4a":
      case "f4b":
      case "mp4":
        return "video";
      default:
        return "audio";
    }
  } else {
    if (file?.type?.match("image.*")) return "img";
    else if (file?.type?.match("video.*")) return "video";
    else if (file?.type?.match("audio.*")) return "audio";
    else return "text";
  }

  // etc...

  return "other";
}

export { gettbystamps, getorgnl, getstamp, lastMessage, validURL, getFileType };

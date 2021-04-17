function lastMessage(msg) {
    if(msg.slice(msg.length-1) == "u" || msg.slice(msg.length-1) == "um") {
       return true;
    } else {
        return false;
    }
}

function gettbystamps(stamps,id){
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dayName=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let date=new Date(stamps*1000);
let year=date.getFullYear();
let month=date.getMonth();
let thedate = date.getDate();
let day = date.getDay();
let hours=date.getHours();
let minutes=date.getMinutes();

const formatAMPM=(date)=> {
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

const fullDate=()=>{
    let temp=dayName[day]+" "+thedate+" "+monthNames[month];
    return temp
}

switch (id) {
    case "strmonth":
        return monthNames[month]
        break;

    case "strday":
    return dayName[day]   
        break;
    case "date":return thedate   
        break;
    case "strmonth":
    return dayName[day]    
        break;

    case "strmonth":return dayName[day]
        break;        

    case "hours":return hours
        break;
    case "minutes":return minutes
        break;
    case "time":return formatAMPM()
        break;
    case "fulldate":return fullDate()
        break;
    default:return "invalid id"
        break;
}

}
function countSpecial(str){
    const punct = "`";
    let count = 0;
    let position=[]
    for(let i = 0; i < str.length; i++){
       if(!punct.includes(str[i])){
          continue;
       };
       count++;
       position.push(i)
    };
    return position;
  }
function getorgnl(msg){

      let temp=countSpecial(msg);
      let temp2=msg.slice(0,temp[temp.length-2])
      return temp2
}
function getstamp(raw){
let temp=countSpecial(raw);
let findex=(temp[(temp.length-2)]+1);
let temp2=raw.substring(findex,temp[temp.length-1])
return  temp2;
}


export {gettbystamps,getorgnl,getstamp, lastMessage}
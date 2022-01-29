function onlyNumRegEx(value) {
  if (value === "") return true;
  const regEx = /^[0-9\b]+$/;
  if (regEx.test(value)) {
    return true;
  } else return false;
}
function allowOnlyNumber(e) {
  let value = e.target.value;
  if (!onlyNumRegEx(value)) e.target.value = value.slice(0, value.length - 1);
}

//valid email regex function
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export { onlyNumRegEx, allowOnlyNumber, validateEmail };

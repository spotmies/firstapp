function onlyNumRegEx(value) {
  const regEx = /^[0-9\b]+$/;
  if (regEx.test(value)) {
    return true;
  } else return false;
}
function allowOnlyNumber(e) {
  let value = e.target.value;
  if (!onlyNumRegEx(value)) e.target.value = value.slice(0, value.length - 1);
}
export { onlyNumRegEx, allowOnlyNumber };

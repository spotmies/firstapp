function allowOnlyNumber(value) {
  const regEx = /^[0-9\b]+$/;
  if (regEx.test(value)) {
    return true;
  } else return false;
}
export { allowOnlyNumber };

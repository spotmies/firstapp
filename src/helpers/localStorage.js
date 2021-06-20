export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    console.log(serializedState);
    if (serializedState === null) return null;
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};
export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {}
};

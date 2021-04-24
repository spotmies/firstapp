function msgdot(msg, length) {
  if (msg.length > length) {
    return msg.slice(0, length) + "....";
  } else {
    return msg;
  }
}
export { msgdot };

import React from "react";
import ReactDOM from "react-dom";
import { Dialog } from "evergreen-ui";
const UserConfirmation = (message, callback) => {
  const container = document.createElement("div");
  container.setAttribute("custom-confirmation-navigation", "");
  document.body.appendChild(container);
  const closeModal = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    callback(callbackState);
  };
  ReactDOM.render(
    <Dialog
      cancelLabel="Cancel"
      confirmLabel="Confirm"
      isShown={true}
      onCacel={() => closeModal(false)}
      onConfirm={() => closeModal(true)}
      title="Warning"
    >
      {message}
    </Dialog>,
    container
  );
};
export default UserConfirmation;

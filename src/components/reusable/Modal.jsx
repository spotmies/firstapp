import react, { useState, useEffect, useRef } from "react";
import React, { Component, useCallback } from "react";

import { Button, Header, Icon, Modal } from "semantic-ui-react";

function UniversalM(props) {
  const [open, setOpen] = useState(false);

  //closeModal = () => {};

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      trigger={<Button>Basic Modal</Button>}
    >
      <Header icon>
        <Icon name="archive" />
        Archive Old Messages
      </Header>
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export { UniversalM };

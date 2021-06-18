import React, { useEffect } from "react";

import Postnew from "../newpost/newpost2";

export default function Newpost2(props) {
  return (
    <div>
      <Postnew editDate="true" history={props.history} />
    </div>
  );
}

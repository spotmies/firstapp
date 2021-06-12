import React, { useEffect } from "react";
import { loadState, saveState } from "../../helpers/localStorage";
import { connect } from "react-redux";

function ReduxPersistent(props) {
  useEffect(() => {
    console.log(loadState("userDetails"));
    if (Object.keys(props.userDetails).length === 0) {
      console.log(loadState("userDetails"));
      props.updateRedux(loadState("userDetails"));
    } else {
      saveState("userDetails", props.userDetails);
    }
  }, [props.userDetails]);
  return null;
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateRedux: (data) => {
      dispatch({ type: "UPDATE_FROM_LOCALSTORAGE", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReduxPersistent);

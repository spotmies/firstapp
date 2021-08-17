import React from "react";
import { connect } from "react-redux";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import "./navbar.css";
import { IconContext } from "react-icons";
import {
  MdAccountBox,
  MdAccountCircle,
  MdChatBubble,
  MdHome,
  MdWork,
} from "react-icons/md";
function LabelBottomNavigation(props) {
  const handleChange = (event, newValue) => {
    props.setBottomBarState(newValue);

    props.history.push(`/${newValue}`);
  };

  return (
    <div>
      <IconContext.Provider value={{ size: "1.5em", className: "nav-icons" }}>
        <BottomNavigation value={props.bottomBarState} onChange={handleChange}>
          <BottomNavigationAction label="Home" value="" icon={<MdHome />} />
          <BottomNavigationAction
            label="Chats"
            value="chat"
            icon={<MdChatBubble />}
          />

          <BottomNavigationAction
            label="My Orders"
            value="mybookings"
            icon={<MdWork />}
          />

          <BottomNavigationAction
            label="Account"
            value="account"
            icon={<MdAccountCircle size="1.7rem" />}
          />
        </BottomNavigation>
      </IconContext.Provider>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    bottomBarState: state.bottomBarState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBottomBarState: (data) => {
      dispatch({ type: "UPDATE_BOTTOM_BAR_STATE", value: data });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelBottomNavigation);

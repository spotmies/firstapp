import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "../../../index.css";

import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyResponses from "../chats/responses";

/*css*/
import "./chat.css";
//import Chat from "../newChat/chating";
import Chat from "./chat-component";

function useWindowSize() {
  const [size, setSize] = React.useState([
    window.innerHeight,
    window.innerWidth,
  ]);
  React.useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function Mybookings(props) {
  const classes = useStyles();
  const history = props.history;
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [height, width] = useWindowSize();

  const handleChange = (event, newValue) => {
    if (newValue == 0) {
      history.push("/response");
    } else if (newValue == 1) {
      history.push("/chat");
    }
  };
  const changeSwipeIndex = (newValue) => {
    handleChange(null, newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  useEffect(() => {
    let browserPath = history.location.pathname.split("/");
    if (browserPath[1] == "chat") {
      handleChangeIndex(1);
    } else if (browserPath[1] == "response") handleChangeIndex(0);
  }, [history.location]);
  /*  our functions*/

  return (
    <div className={classes.root} style={{ width: "100%" }}>
      {width > 700 ? (
        <div style={{ marginTop: "12px" }}>
          <ChatResponseBar
            value={value}
            handleChange={handleChange}
            a11yProps={a11yProps}
          />
        </div>
      ) : props.disableAppBar == false ? (
        <ChatResponseBar
          value={value}
          handleChange={handleChange}
          a11yProps={a11yProps}
        />
      ) : null}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={changeSwipeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <MyResponses />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Chat className="chat" history={history} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

function ChatResponseBar({ value, handleChange, a11yProps }) {
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Response" {...a11yProps(0)} />
        <Tab label="Chat" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    responses: state.responses,
    disableAppBar: state.disableChatResponseTab,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewResponse: (data) => {
      dispatch({ type: "ADD_NEW_RESPONSE", value: data });
    },
    updateAllResponses: (data) => {
      dispatch({ type: "UPDATE_ALL_RESPONSES", value: data });
    },
    deleteResponse: (responseId) => {
      dispatch({ type: "DELETE_RESPONSE", value: responseId });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mybookings);

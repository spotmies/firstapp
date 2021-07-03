import React from 'react';
import PropTypes from 'prop-types';
import firebase from "../../../firebase";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { Button, Card, Image, Dropdown, Icon } from "semantic-ui-react";
import "../../../index.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/*css*/
import "./chat.css";
import Chat from "./chat-component"


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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

 export default function Mybookings(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  /*  our functions*/

  const history = useHistory();

  
  return (
    <div className={classes.root} style={{width: "100%", marginTop: "12px"}}>
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
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {/* <div className="chat-container">
          <div className="chat-list">

          </div>
          <div className="chat">

          </div>
          </div> */}
          <Chat className="chat"/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}



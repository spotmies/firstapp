import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./partner_store.scss";
import {
  MdAccountCircle,
  MdLocationOn,
  MdPhone,
  MdQuickreply,
  MdStar,
} from "react-icons/md";
import SwipeableViews from "react-swipeable-views";
import { CircularProgress } from "@material-ui/core";
import { Rating } from "@mui/material";
export default function PartnerStore() {
  const [webview, setwebview] = useState(true);
  const dummyimage =
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";
  return (
    <div className="store-parent">
      <div className="store-web">
        <div className="background colum-space-btn">
          <div className="info row-space-btn">
            <div className="info-child-1 row-space-btn">
              <img
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                alt="store"
                className="profie-avatar"
              />
              <span className="personal-info">
                <p>
                  <MdAccountCircle /> Naveen kumar{" "}
                </p>
                <p>
                  <MdPhone /> 8341980196{" "}
                </p>
                <p className="text-overflow">
                  <MdLocationOn /> Madhavadhara,visakhapatnam{" "}
                </p>
              </span>
            </div>
            <div className="guage colum-space-btn">
              <div className="progress-parent">
                <CircularProgress
                  variant="determinate"
                  value={75}
                  className="progress"
                />
                <p>
                  4.5 <MdStar color="#19a73c" />{" "}
                </p>
              </div>
              <p>Total orders - 56</p>
            </div>
          </div>
          <div className="row-space-btn width-70">
            <p>Entrepreneur&nbsp;|&nbsp;4000/-</p>
            <div className="roww">
              <span className="communication-icon pointer">
                <MdPhone /> Call
              </span>
              <span className="communication-icon pointer">
                <MdQuickreply /> Chat
              </span>
            </div>
          </div>
        </div>
        <div className="store relative">
          <BasicTabs />
        </div>
      </div>
    </div>
  );
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const dummyimage =
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ width: "100%" }} className="sticky">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
          className="tabs-parent"
        >
          <Tab label="Catelogs" {...a11yProps(0)} className="tab-child" />
          <Tab label="Reviews" {...a11yProps(1)} className="tab-child" />
        </Tabs>
      </Box>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <div className="catelogs-parent">
            {catelogCard(342)}
            {catelogCard(232)}
            {catelogCard(3452)}
            {catelogCard(2532)}
            {catelogCard(3452)}
            {catelogCard(342)}
            {catelogCard(232)}
            {catelogCard(3452)}
            {catelogCard(3452)}
            {catelogCard(342)}
            {catelogCard(232)}
            {catelogCard(3452)}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="reviews-parent">
            <div className="reviews">
              <div className="child-1">
                {" "}
                <img
                  src={dummyimage}
                  alt="store"
                  className="profie-avatar-small"
                />
              </div>
              <div>
                <p className="rtitle">Sekhar javvadi</p>
                <Rating name="disabled" value={4} disabled />
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolorem, unde perferendis consequatur, quaerat facilis eum,
                  quisquam aut error eius quibusdam totam laboriosam ex
                  assumenda sed inventore tempore voluptate ipsa dolores!
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );

  function catelogCard(rate) {
    return (
      <div className="catelog pointer">
        <img src={dummyimage} alt="" className="cardProfile" />
        <div className="c-details">
          <div className="more-details">
            <p className="ctitle">Title</p>
            <p className="cprice">{`₹ ${rate}/-`}</p>
          </div>
          <p className="cdesc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      </div>
    );
  }
}

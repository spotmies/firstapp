import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react";
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
import { useStores } from "../../stateManagement";
import FullScreenWidget from "../../reusable/helpers";
import {
  getIdFromUrl,
  getRating,
  getRatingPercent,
} from "../../../helpers/convertions";

export default function PartnerStore() {
  const [loader, setloader] = useState(true);
  const [data, setdata] = useState({});
  const { services } = useStores();

  useEffect(async () => {
    const pId = getIdFromUrl();
    let temp = await services.getStore(pId);
    if (temp != null) {
      setdata(temp);
      setloader(false);
    } else {
      alert("Store not found");
    }

    return () => {};
  }, []);

  return (
    <div className="store-parent">
      {loader ? (
        <FullScreenWidget type="loader" show={loader} />
      ) : (
        mainComponent()
      )}
    </div>
  );

  function mainComponent() {
    return (
      <div className="store-web">
        <div className="background colum-space-btn">
          <div className="info row-space-btn">
            <div className="info-child-1 row-space-btn">
              <img
                src={data.partnerPic}
                alt="store"
                className="profie-avatar"
              />
              <span className="personal-info">
                <p>
                  <MdAccountCircle /> {data.name}
                </p>
                <p>
                  <MdPhone /> {data.phNum}
                </p>
                <p className="text-overflow">
                  <MdLocationOn />
                  visakhapatnam{" "}
                </p>
              </span>
            </div>
            <div className="guage colum-space-btn">
              <div className="progress-parent">
                <CircularProgress
                  variant="determinate"
                  value={getRatingPercent(data.rate)}
                  className="progress"
                />
                <p>
                  {getRating(data.rate)} <MdStar color="#19a73c" />{" "}
                </p>
              </div>
              <p>Total orders - 56</p>
            </div>
          </div>
          <div className="row-space-btn width-70">
            <p>{services.getServiceNameById(data.job)}&nbsp;|&nbsp;4000/-</p>
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
          <BasicTabs data={data} />
        </div>
      </div>
    );
  }
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
function BasicTabs(props) {
  const data = props.data;
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
            {data.catelogs.map((item, index) => {
              return (
                <div key={index}>
                  {catelogCard(
                    item?.media[0]?.url,
                    item.name,
                    item.description,
                    item.price
                  )}
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="reviews-parent">
            {data?.rate?.map((item, index) => {
              return (
                <div key={index}>
                  {reviewCard(
                    item?.uDetails?.pic,
                    item?.uDetails?.name,
                    item?.rating,
                    item?.description
                  )}
                </div>
              );
            })}
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );

  function reviewCard(pic, name, rating, review) {
    return (
      <div className="reviews">
        <div className="child-1">
          {" "}
          <img src={pic} alt="store" className="profie-avatar-small" />
        </div>
        <div>
          <p className="rtitle">{name}</p>
          <Rating name="disabled" value={rating / 4} disabled />
          <p>{review}</p>
        </div>
      </div>
    );
  }

  function catelogCard(img, title, desc, rate) {
    return (
      <div className="catelog pointer">
        <img src={img} alt="" className="cardProfile" />
        <div className="c-details">
          <div className="more-details">
            <p className="ctitle">{title}</p>
            <p className="cprice">{`₹ ${rate}/-`}</p>
          </div>
          <p className="cdesc">{desc}</p>
        </div>
      </div>
    );
  }
}

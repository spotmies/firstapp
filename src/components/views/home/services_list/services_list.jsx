import React from "react";
import { useState } from "react";
import {
  AiOutlineAreaChart,
  AiOutlineHome,
  AiOutlineLaptop,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiCake, BiCctv, BiVideoRecording } from "react-icons/bi";
import {
  MdOutlineChair,
  MdOutlineDesignServices,
  MdOutlineFestival,
} from "react-icons/md";
import { RiKeynoteLine } from "react-icons/ri";
import { BsFileCode } from "react-icons/bs";
import { GiDesk, GiDoorHandle } from "react-icons/gi";
import { IoRocketOutline } from "react-icons/io5";
import "./styles.scss";

export default function ServicesList() {
  const data1 = [
    {
      icon: AiOutlineHome,
      title: "Interior Design",
      color: "#80c6ff",
      iconColor: "#0890ff",
      desc: "100+ services",
    },
    {
      icon: MdOutlineFestival,
      title: "Event Management",
      color: "#ffe369",
      iconColor: "#e3b900",
      desc: "100+ services",
    },
    {
      icon: RiKeynoteLine,
      title: "Home Decors",
      color: "#80c6ff",
      iconColor: "#0890ff",
      desc: "100+ services",
    },
    {
      icon: MdOutlineDesignServices,
      title: "Designing",
      color: "#ffe369",
      iconColor: "#e3b900",
      desc: "100+ services",
    },
    {
      icon: BiVideoRecording,
      title: "Photo & Video Grapher",
      color: "#80c6ff",
      iconColor: "#0890ff",
      desc: "100+ services",
    },
    {
      icon: AiOutlineAreaChart,
      title: "UI/UX Design",
      color: "#ffe369",
      iconColor: "#e3b900",
      desc: "100+ services",
    },
  ];
  const data2 = [
    {
      icon: BsFileCode,
      title: "Application Development",
      color: "#ffe369",
      iconColor: "#e3b900",
      desc: "100+ services",
    },
    {
      icon: GiDoorHandle,
      title: "Automation services",
      color: "#80c6ff",
      iconColor: "#0890ff",
      desc: "100+ services",
    },

    {
      icon: AiOutlineLaptop,
      title: "Pc/Laptop Services",
      color: "#80c6ff",
      iconColor: "#0890ff",
      desc: "100+ services",
    },
    {
      icon: BiCctv,
      title: "CCTV Services",
      color: "#ffe369",
      iconColor: "#e3b900",
      desc: "100+ services",
    },
    {
      icon: IoRocketOutline,
      title: "Digital Marketing",
      color: "#ffe369",
      iconColor: "#e3b900",
      desc: "100+ services",
    },
    {
      icon: AiOutlineAreaChart,
      title: "Finance",
      color: "#80c6ff",
      iconColor: "#0890ff",
      desc: "100+ services",
    },
  ];
  const [count, setcount] = useState(0);
  const [data, setdata] = useState(data1);

  const changeCount = () => {
    if (count === 0) {
      setdata(data2);
      setcount(count + 1);
    } else {
      setdata(data1);
      setcount(count - 1);
    }
  };
  const serviceCard = (title, desc, color, icon, iconColor) => {
    return (
      <div className="service-card">
        <div className="icon-wrapperr" style={{ backgroundColor: color }}>
          {React.createElement(icon, { color: iconColor, size: "3rem" })}
        </div>
        <div className="content">
          <p className="chead">{title}</p>
          <p className="description">{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="center">
      <div className="service-list">
        <div className="section-1">
          <p className="head home-page-head">Our Services</p>
          <p className="description">
            {" "}
            Hey! Would like to grow up your skills and if you are interested to
            do this just start here your skills and if you are interested to
          </p>
        </div>
        <div className="section-2">
          <div className="service-card-parent">
            {data.map((item, key) => {
              if (key == 5) {
                return (
                  <div key={key} className="dot-parent">
                    <span
                      className="dot-circle"
                      onClick={changeCount}
                      style={{
                        backgroundColor:
                          count === 0
                            ? "rgb(17, 17, 17)"
                            : "rgb(201, 201, 201)",
                      }}
                    />

                    <span
                      className="dot-circle"
                      onClick={changeCount}
                      style={{
                        backgroundColor:
                          count === 1
                            ? "rgb(17, 17, 17)"
                            : "rgb(201, 201, 201)",
                      }}
                    />
                  </div>
                );
              }
              return (
                <div key={key}>
                  {serviceCard(
                    item.title,
                    item.desc,
                    item.color,
                    item.icon,
                    item.iconColor
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

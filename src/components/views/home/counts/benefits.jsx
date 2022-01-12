import React from "react";
import {
  MdAdminPanelSettings,
  MdChatBubbleOutline,
  MdOutlinePrivacyTip,
} from "react-icons/md";
export default function Benefits() {
  const data = [
    {
      icon: MdAdminPanelSettings,
      color: "rgb(0 203 119)",
      bg: "rgb(125 239 192)",
      title: "Secure transaction",
      description: "Cash on service",
    },
    {
      icon: MdChatBubbleOutline,
      color: "#0890ff",
      bg: "#80c6ff",
      title: "Easy Communication",
      description: "In App chating, internet calling",
    },
    {
      icon: MdOutlinePrivacyTip,
      color: "#e3b900",
      bg: "#ffe369",
      title: "Better privacy",
      description: "Choice to share your contact details",
    },
  ];
  const benefitCard = (icon, color, bg, shead, desc) => {
    return (
      <div className="benefit-card">
        <div>
          <span className="icon-wrapper" style={{ backgroundColor: bg }}>
            {React.createElement(icon, { size: "3rem", color: color })}
          </span>
        </div>
        <div className="content">
          <p className="shead">{shead}</p>
          <p className="description">{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="center">
      <div className="benefits">
        <p className="head center-text">Benefits</p>

        <div className="benefit-card-parent">
          {data.map((item, index) => {
            return (
              <div key={index}>
                {benefitCard(
                  item.icon,
                  item.color,
                  item.bg,
                  item.title,
                  item.description
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

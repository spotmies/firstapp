import React from "react";
import Fade from "react-reveal/Fade";
export default function Benefits(props) {
  const data = props.data;
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
    <Fade>
      <div className="center">
        <div className="benefits">
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
    </Fade>
  );
}

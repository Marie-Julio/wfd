import React from "react";
// import { IconName } from "boxicons";



const Icon = ({className, name, size = "24px", color = "", style, onClick, ...props }) => {
  return <i className={`bx ${name} ${className}`}  style={{ fontSize: size, color, ...style}} onClick={onClick} {...props} />;
};

export default Icon;
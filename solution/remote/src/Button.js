import React from "react";

const Button = ({text, backgroundColor, color}) => {

return(<button style={{backgroundColor:`${backgroundColor||"none"}`, color:`${color||"black"}`}}>{`${text || "Text for remote button"}`}</button>)};

export default Button;

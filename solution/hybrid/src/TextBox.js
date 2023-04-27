import React from "react";

const TextBox = ({placeholder}) => {

return(<input placeholder={`${placeholder || "Default placeholder"}`}/>)};

export default TextBox;
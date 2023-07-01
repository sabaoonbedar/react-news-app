import React from "react";
import '../../css/checkbox.css'
const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input className="red-input"
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

export default Checkbox;
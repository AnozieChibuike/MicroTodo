import React from "react";
import { FaPlus } from "react-icons/fa";

const AddIcon = ({
  color,
  size = 30,
  onClick = () => {}
}) => {
  return (
    <div>
      <FaPlus
        size={size}
        color={color}
        onClick={onClick}
      />
    </div>
  );
};

export default AddIcon;

import React from "react";
import { FaPlus } from "react-icons/fa";

const AddIcon = ({
  color,
  size = 30,
}) => {
  return (
    <div>
      <FaPlus
        size={size}
        color={color}
      />
    </div>
  );
};

export default AddIcon;

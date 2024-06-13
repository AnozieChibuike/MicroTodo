import React from 'react';
import { IoAlertOutline } from "react-icons/io5";

const DueIcon = ({color, size }) => {
  return (
    <div>
      <IoAlertOutline size={size} color={color} />
    </div>
  );
};

export default DueIcon;

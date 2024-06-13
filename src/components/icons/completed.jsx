import React from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const CompletedIcon = ({color, size }) => {
  return (
    <div>
      <IoIosCheckmarkCircleOutline size={size} color={color} />
    </div>
  );
};

export default CompletedIcon;

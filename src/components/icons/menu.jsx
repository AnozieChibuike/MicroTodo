import React from "react";
import { MdMoreVert } from "react-icons/md";

const MenuIcon = ({
  color,
  aria_describedby,
  onClick = () => {},
  size = 30,
}) => {
  return (
    <div className="cursor-pointer">
      <MdMoreVert
        size={size}
        color={color}
        onClick={onClick}
        aria-describedby={aria_describedby}
      />
    </div>
  );
};

export default MenuIcon;

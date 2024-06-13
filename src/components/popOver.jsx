import * as React from "react";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";

export default function BasicPopover({
  id,
  open,
  anchorEl,
  handleClose = () => {},
}) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className="py-5 pr-10 px-2">
        <Link to="/login" className="text-start">Logout</Link>
      </div>
    </Popover>
  );
}

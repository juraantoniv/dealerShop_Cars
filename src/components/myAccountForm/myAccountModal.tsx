import { Link, MenuItem, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import { LoginFrom } from "../loginComponent/loginComponent";
import { MyAccount } from "./myAccount";

export const MyAccountModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MenuItem onClick={handleClickOpen}>My account</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <MyAccount />
      </Modal>
    </div>
  );
};

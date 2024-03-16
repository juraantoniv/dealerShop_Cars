import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ListItemIcon, MenuItem, Modal } from "@mui/material";
import React from "react";

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
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <AccountCircleIcon fontSize={"small"} />
        </ListItemIcon>
        My account
      </MenuItem>
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

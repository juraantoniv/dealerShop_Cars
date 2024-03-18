import "./recoveryPassword.module.css";

import PasswordIcon from "@mui/icons-material/Password";
import { Link, ListItemIcon, MenuItem, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

import { ChangePassword } from "../loginComponent/changePassword";

export const RecoveryPasswordDiag = () => {
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
          <PasswordIcon />
        </ListItemIcon>
        Change password
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          style={{
            width: "100",
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <ChangePassword />
        </Box>
      </Modal>
    </div>
  );
};

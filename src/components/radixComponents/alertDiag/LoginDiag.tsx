import "./styles.css";

import LoginIcon from "@mui/icons-material/Login";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Modal,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";

import { LoginFrom } from "../../loginComponent/loginComponent";

export const LoginDiag = () => {
  // const [open, setOpen] = useState(false);
  //
  // const setOpenHandler = (open: boolean) => {
  //   setOpen(open);
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<LoginIcon />}
        variant="contained"
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <LoginFrom />
        </Box>
      </Modal>
    </div>
  );
};

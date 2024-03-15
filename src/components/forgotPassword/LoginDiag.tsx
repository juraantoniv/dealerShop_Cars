import "./recoveryPassword.module.css";

import { Link, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import RecoveryPassword from "./recoveryPassword";

export const RecoveryPasswordDiag = () => {
  // const [open, setOpen] = useState(false);
  //
  // const setOpenHandler = (open: boolean) => {
  //   setOpen(open);
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    close && close();
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Typography>
        <Link
          fontSize={"medium"}
          onClick={handleClickOpen}
          variant={"inherit"}
          color="inherit"
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          Forgot Password?
        </Link>
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <RecoveryPassword />
        </Box>
      </Modal>
    </div>
  );
};

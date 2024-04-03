import "./LogOut.module.css";

import { ButtonGroup, Paper } from "@material-ui/core";
import { PersonAdd } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  ListItemIcon,
  MenuItem,
  Modal,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { authService } from "../../../services/auth.service";
import { userActions } from "../../../store/slices";
import { useAppDispatch } from "../../../store/store";
import { SignUp } from "../../myAccountForm/createAccountNew";
import s from "./LogOut.module.css";

export const LogOut = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();
  const logOutHandler = async () => {
    try {
      await authService.logOut();
      dispatch(userActions.logOff({}));
      dispatch(userActions.setCount(5));
      navigate("/");
    } catch (e) {}
  };

  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        startIcon={<LogoutIcon />}
        variant={"contained"}
      >
        <Trans>LogOut</Trans>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Card className={s.modal} variant={"outlined"}>
          <Typography component="div" variant="h6">
            Are you sure
          </Typography>
          <Divider orientation="vertical" variant="middle" />
          <Card className={s.buttons}>
            <Button
              className={s.currentButton}
              onClick={handleClose}
              variant={"contained"}
              size={"medium"}
            >
              Cancel
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              onClick={logOutHandler}
              variant={"contained"}
              size={"medium"}
              className={s.currentButton}
            >
              LogOut
            </Button>
          </Card>
        </Card>
      </Modal>
    </Box>
  );
};

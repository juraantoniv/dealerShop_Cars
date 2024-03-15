import "./styles.css";

import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";

import { LoginFrom } from "../../loginComponent/loginComponent";

const AlertDialogDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Button startIcon={<LoginIcon />} variant="contained">
        Login
      </Button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Content className="AlertDialogContent">
        <LoginFrom />
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDemo;

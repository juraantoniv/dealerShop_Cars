import "./styles.css";

import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";

import { authService } from "../../../services/auth.service";
import { userThunks } from "../../../store/slices";
import { useAppDispatch } from "../../../store/store";

export const LogOut = () => {
  const dispatch = useAppDispatch();
  const logOutHandler = async () => {
    try {
      await authService.logOut();
    } catch (e) {}
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button startIcon={<LogoutIcon />} variant={"contained"}>
          LogOut
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                startIcon={<LogoutIcon />}
                onClick={logOutHandler}
                variant={"contained"}
              >
                LogOut
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

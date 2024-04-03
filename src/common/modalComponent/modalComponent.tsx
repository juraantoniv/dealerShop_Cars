import PasswordIcon from "@mui/icons-material/Password";
import { Button, Card, ListItemIcon, MenuItem, Modal } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

type ModalComponentType = {
  icon: ReactNode;
  component: ReactElement;
  className?: any;
  buttonName: string;
  menu?: boolean;
};

export const ModalComponent: React.FC<ModalComponentType> = ({
  icon,
  component,
  buttonName,
  menu,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card>
      {!menu ? (
        <div>
          <Button onClick={handleClickOpen} startIcon={icon}>
            {buttonName}
          </Button>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleClickOpen}>
            <ListItemIcon>{icon}</ListItemIcon>
            {buttonName}
          </MenuItem>
        </div>
      )}
      <Modal open={open} onClose={handleClose} children={component} />
    </Card>
  );
};

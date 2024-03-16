import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";

import s from "./myAccount.module.css";

export function MyAccount() {
  const [name, setName] = useState("Cat in the Hat");
  const [disabled, setDisabled] = useState<boolean>(true);

  const editMode = () => {
    setDisabled(false);
  };

  return (
    <Box component="form" className={s.box} noValidate autoComplete="off">
      <TextField
        id="outlined-controlled"
        label="Controlled"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
        disabled={disabled}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
        disabled={disabled}
      />
      <Button onClick={editMode}>Edit account</Button>
      <Button onClick={editMode}>Save</Button>
    </Box>
  );
}

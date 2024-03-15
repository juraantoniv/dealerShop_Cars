import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

type SelectComponentType = {
  setCurrencyType: (el: string) => void;
};

export const SelectComponent: React.FC<SelectComponentType> = ({
  setCurrencyType,
}) => {
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
    setCurrencyType(event.target.value);
  };
  return (
    <Box>
      <Select
        labelId="demo-simple-select-error-label"
        id="demo-simple-select-error"
        value={currency}
        label="Age"
        size={"small"}
        onChange={handleChange}
        renderValue={(value) => `${value}`}
      >
        <MenuItem value={"UAH"}>UAH</MenuItem>
        <MenuItem value={"EUR"}>EUR</MenuItem>
        <MenuItem value={"USD"}>USD</MenuItem>
      </Select>
    </Box>
  );
};

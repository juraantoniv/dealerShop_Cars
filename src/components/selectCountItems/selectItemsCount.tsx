import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { userActions, userThunks } from "../../store/slices";
import { selectCount, sortDirection, useAppDispatch } from "../../store/store";

export const SelectItemsCount = () => {
  const dispatch = useAppDispatch();

  const itemPage = useSelector(selectCount);
  const direction = useSelector(sortDirection);

  const handleChange = async (event: SelectChangeEvent) => {
    dispatch(userActions.setCount(Number(event.target.value)));
    dispatch(
      userThunks.fetchGoods({
        limit: event.target.value,
        ORDER: !direction ? "ASC" : "DESC",
      }),
    );
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Count</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={itemPage.toString()}
          label="Count"
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

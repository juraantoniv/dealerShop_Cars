import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";

import { userThunks } from "../../store/slices";
import { selectCars, selectUser, useAppDispatch } from "../../store/store";
import { LoginFrom } from "../loginComponent/loginComponent";
import LoginDiag from "../loginForm/postCar";
import AlertDialog from "../postCarForm/postCar";
import AlertDialogDemo from "../radixComponents/alertDiag/alertDiag";
import { LogOut } from "../radixComponents/logOut/logOut";
import s from "./headerComponent.module.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const { data } = useSelector(selectCars);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const search = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTitle(event.currentTarget.value);
  };
  console.log(data);
  const addItemHandler = () => {
    if (title.trim() !== "") {
      dispatch(userThunks.fetchGoods({ search: title }));
      setTitle("");
    } else {
      setError("Title is required");
      dispatch(userThunks.fetchGoods());
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={s.tollBar}>
          <Box className={s.leftBoxToll}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ width: "20%" }}
            >
              Cars
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={search}
                value={title}
                error={!!error}
                onKeyPress={onKeyPressHandler}
              />
            </Search>
          </Box>

          <AlertDialog />
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
            onClick={handleClick}
          />
          {!data ? <AlertDialogDemo /> : <LogOut />}
        </Toolbar>
      </AppBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

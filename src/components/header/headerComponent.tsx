import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Menu } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userThunks } from "../../store/slices";
import { selectCars, selectUser, useAppDispatch } from "../../store/store";
import { RecoveryPasswordDiag } from "../forgotPassword/recoveryPasswordDiag";
import { CrateAccountModal } from "../myAccountForm/crateAccountModal";
import { MyAccountModal } from "../myAccountForm/myAccountModal";
import PostCarDialog from "../postCarForm/postCar";
import { LoginDiag } from "../radixComponents/alertDiag/loginDiag";
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
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const search = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTitle(event.currentTarget.value);
  };
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

  const toHomePage = () => {
    navigate("/");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className={s.container}>
      <AppBar position="static">
        <Toolbar className={s.tollBar}>
          <Button
            onClick={toHomePage}
            size={"small"}
            sx={{ cursor: "pointer", color: "white" }}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Box className={s.leftBoxToll}>
            {data ? (
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
            ) : null}
          </Box>
          <Box className={s.rightBoxToll}>
            {data ? <PostCarDialog /> : null}
            {data ? (
              <Avatar
                className={s.avatar}
                alt="Avatar"
                src={user.avatar}
                onClick={handleClick}
              />
            ) : null}
            {!data ? <LoginDiag /> : <LogOut />}
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        className={s.menu}
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
        <CrateAccountModal callBack={handleClose} />
        <MyAccountModal />
        <RecoveryPasswordDiag />
      </Menu>
    </Box>
  );
}

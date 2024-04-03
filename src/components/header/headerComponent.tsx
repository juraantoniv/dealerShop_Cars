import CollectionsIcon from "@mui/icons-material/Collections";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import PasswordIcon from "@mui/icons-material/Password";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, IconButton, Menu, Switch } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import { alpha, createTheme, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { KeyboardEvent, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ModalComponent } from "../../common/modalComponent/modalComponent";
import { SelectLanguage } from "../../features/i18nLanguageChanger/languageSelect";
import { UniversalLanguageComponent } from "../../features/i18nLanguageChanger/universalLanguageComponent";
import { userActions, userThunks } from "../../store/slices";
import {
  langValue,
  selectCars,
  selectUser,
  themeValue,
  useAppDispatch,
} from "../../store/store";
import { DrawerComponent } from "../drawer/drawer";
import { RecoveryPasswordDiag } from "../forgotPassword/recoveryPasswordDiag";
import { ChangePassword } from "../loginComponent/changePassword";
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
  const darkMode = useSelector(themeValue);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const lang = useSelector(langValue);
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
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(userActions.setTheme(event.target.checked));
  };

  return (
    <Box className={s.container}>
      <AppBar position="static">
        <Toolbar className={s.tollBar}>
          <Box className={s.leftBoxToll}>
            <MaterialUISwitch checked={darkMode} onChange={handleChange} />
            {data ? (
              <Box className={s.searchIcons}>
                <Button
                  onClick={toHomePage}
                  size={"small"}
                  sx={{ cursor: "pointer" }}
                  startIcon={<HomeIcon />}
                  variant={"contained"}
                >
                  <Trans>Home</Trans>
                </Button>
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

                <Button
                  href="gallery"
                  variant={"contained"}
                  startIcon={<CollectionsIcon />}
                >
                  <Trans>Gallery</Trans>
                </Button>
              </Box>
            ) : null}
            <Box className={s.MenuIcon}>
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
          <SelectLanguage />
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
        <RecoveryPasswordDiag closeModal={handleClose} />
      </Menu>
    </Box>
  );
}
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "light" ? "#03a9f4" : "#263238",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff",
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

import "./index.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { App } from "./App";
import i18n from "./features/i18nLanguageChanger/118n";
import { persistor, store, themeValue } from "./store/store";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const Root = () => {
  const darkMode = useSelector(themeValue);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            // background: darkMode ? "dark !important" : "white !important",
            backgroundImage: "none",
            boxShadow: "none",
            borderRadius: "10px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "5px",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> <App />
    </ThemeProvider>
  );
};

root.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </I18nextProvider>,
);

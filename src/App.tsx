import "./App.css";

import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { useSelector } from "react-redux";

import { Router } from "./routes/router";

export function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

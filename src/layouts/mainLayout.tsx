import React from "react";
import { Outlet } from "react-router-dom";

import SearchAppBar from "../components/header/headerComponent";
import { FooterPage } from "../features/footer/reactFooter";

export const MainLayout = () => {
  return (
    <>
      <SearchAppBar />
      <Outlet />
      <FooterPage />
    </>
  );
};

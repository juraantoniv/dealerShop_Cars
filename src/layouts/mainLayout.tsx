import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SearchAppBar from "../components/header/headerComponent";
import { FooterPage } from "../features/footer/reactFooter";
import { userThunks } from "../store/slices";
import {
  loadingStatus,
  selectCars,
  selectCount,
  setOffset,
  useAppDispatch,
} from "../store/store";

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const skip = useSelector(setOffset);
  const loading = useSelector(loadingStatus);
  const { data } = useSelector(selectCars);
  console.log(loading);
  useEffect(() => {
    dispatch(
      userThunks.fetchGoods({
        limit: itemPage.toString(),
        offset: skip.toString(),
      }),
    );
  }, []);

  return (
    <>
      <ToastContainer />
      <SearchAppBar />
      {loading === "loading" ? <LinearProgress /> : null}

      <>
        <Outlet />
        {data ? <FooterPage /> : null}
      </>
    </>
  );
};

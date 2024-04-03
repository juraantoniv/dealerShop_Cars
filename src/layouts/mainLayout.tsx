import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ReactSlickDemo } from "../components/courusellComponent/caurusell";
import SearchAppBar from "../components/header/headerComponent";
import { FooterPage } from "../features/footer/reactFooter";
import { userActions, userThunks } from "../store/slices";
import {
  loadingStatus,
  selectCars,
  selectCount,
  setOffset,
  sortDirection,
  useAppDispatch,
} from "../store/store";

export const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = useSelector(sortDirection);
  const limit = searchParams.get("limit");
  console.log(limit);
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const skip = useSelector(setOffset);
  const loading = useSelector(loadingStatus);
  const { data } = useSelector(selectCars);

  useEffect(() => {
    dispatch(
      userThunks.fetchGoods({
        limit: itemPage.toString(),
        ORDER: sortValue ? "ASC" : "DESC",
      }),
    )
      .unwrap()
      .then()
      .catch((e) => {
        dispatch(userActions.logOff({}));
        dispatch(userActions.setCount(5));
      });
  }, []);
  return (
    <Box>
      <ToastContainer />
      <SearchAppBar />
      {loading === "loading" ? (
        <LinearProgress sx={{ margin: "25px" }} />
      ) : null}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Outlet />
        {data ? <ReactSlickDemo /> : null}
        {data ? <FooterPage /> : null}
      </Box>
    </Box>
  );
};

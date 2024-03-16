import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import SearchAppBar from "../components/header/headerComponent";
import { LoginFrom } from "../components/loginComponent/loginComponent";
import { FooterPage } from "../features/footer/reactFooter";
import { userThunks } from "../store/slices";
import { selectCars, useAppDispatch } from "../store/store";

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userThunks.fetchGoods());
  }, []);

  const { data } = useSelector(selectCars);
  return (
    <>
      <SearchAppBar />
      {data ? (
        <>
          <Outlet />
          <FooterPage />
        </>
      ) : null}
    </>
  );
};

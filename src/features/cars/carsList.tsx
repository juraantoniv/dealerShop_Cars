import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { CardItem } from "../../components/card/cardItem";
import { SelectItemsCount } from "../../components/selectCountItems/selectItemsCount";
import { userThunks } from "../../store/slices";
import { selectCars, selectCount, useAppDispatch } from "../../store/store";
import s from "./carList.module.css";

export const CarList = () => {
  const dispatch = useAppDispatch();

  const cars = useSelector(selectCars);
  const amountPages = Math.ceil(cars?.total / cars?.limit);
  const itemPage = useSelector(selectCount);

  useEffect(() => {
    dispatch(userThunks.fetchGoods({ limit: itemPage.toString() }));
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const items = itemPage * (value - 1);
    dispatch(
      userThunks.fetchGoods({
        limit: String(cars?.limit),
        offset: items.toString(),
      }),
    );
  };

  return (
    <div className={s.container}>
      <div className={s.sideContainer}>
        <SelectItemsCount />
      </div>
      <Box className={s.contentContainer}>
        <CardItem items={cars.data} />
        <Pagination
          sx={{ marginTop: "30px" }}
          count={amountPages}
          page={cars?.page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </div>
  );
};

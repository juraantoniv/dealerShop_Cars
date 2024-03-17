import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CardItem } from "../../components/card/cardItem";
import { SelectComponent } from "../../components/selectComponent/selectComponent";
import { SelectItemsCount } from "../../components/selectCountItems/selectItemsCount";
import { SortComponent } from "../../components/sortComponent/sortComponent";
import { userActions, userThunks } from "../../store/slices";
import {
  selectCars,
  selectCount,
  setOffset,
  useAppDispatch,
} from "../../store/store";
import s from "./carList.module.css";

export const CarList = () => {
  const dispatch = useAppDispatch();

  const cars = useSelector(selectCars);
  const skip = useSelector(setOffset);
  const amountPages = Math.ceil(cars?.total / cars?.limit);
  const itemPage = useSelector(selectCount);
  const [sortDirection, setSort] = useState<boolean>(false);
  const [currency, setCurrency] = React.useState("");
  const { data } = useSelector(selectCars);

  const sort = (direction: boolean) => {
    setSort(direction);
    dispatch(
      userThunks.fetchGoods({
        limit: String(cars?.limit),
        offset: skip.toString(),
        ORDER: sortDirection ? "ASC" : "DESC",
      }),
    );
  };
  const currencyType = (type: string) => {
    setCurrency(type);
  };

  useEffect(() => {
    dispatch(
      userThunks.fetchGoods({
        limit: itemPage.toString(),
        offset: skip.toString(),
      }),
    );
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const items = itemPage * (value - 1);
    dispatch(userActions.setOffset(items));
    dispatch(
      userThunks.fetchGoods({
        limit: String(cars?.limit),
        offset: items.toString(),
      }),
    );
  };

  return (
    <>
      {data ? (
        <div className={s.container}>
          <div className={s.sideContainer}>
            <div className={s.sortContainer}>
              <SelectItemsCount />
              <SortComponent sortDirectionCallBack={sort} />
            </div>
            <SelectComponent setCurrencyType={currencyType} />
          </div>
          <Box className={s.contentContainer}>
            <CardItem items={cars.data} currencyType={currency} />
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
      ) : null}
    </>
  );
};

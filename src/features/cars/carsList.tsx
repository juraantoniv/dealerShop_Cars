import { Card, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { findValueByKey } from "../../common/func/findCurrency";
import { DataCars } from "../../common/types/types";
import { CardItem } from "../../components/card/cardItem";
import { SelectComponent } from "../../components/selectComponent/selectComponent";
import { SelectItemsCount } from "../../components/selectCountItems/selectItemsCount";
import { SortComponent } from "../../components/sortComponent/sortComponent";
import { userActions, userThunks } from "../../store/slices";
import {
  selectCars,
  selectCount,
  setOffset,
  sortDirection,
  useAppDispatch,
} from "../../store/store";
import s from "./carList.module.css";

function valuetext(value: number) {
  return `${value}°C`;
}

export const CarList = () => {
  const dispatch = useAppDispatch();

  const cars = useSelector(selectCars);
  const skip = useSelector(setOffset);
  const amountPages = Math.ceil(cars?.total / cars?.limit);
  const itemPage = useSelector(selectCount);
  const direction = useSelector(sortDirection);
  // const [sortDirection, setSort] = useState<boolean>(false);
  const [currency, setCurrency] = React.useState("");
  const { data } = useSelector(selectCars);

  // const filteredCars: Array<DataCars> = data.filter(
  //   (el) =>
  //     findValueByKey(el.currency, "UAH")! > min &&
  //     findValueByKey(el.currency, "UAH")! < max,
  // );

  const currencyType = (type: string) => {
    setCurrency(type);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const items = itemPage * (value - 1);
    dispatch(userActions.setOffset(items));
    dispatch(
      userThunks.fetchGoods({
        limit: String(cars?.limit),
        offset: items.toString(),
        ORDER: !direction ? "ASC" : "DESC",
      }),
    );
  };

  return (
    <>
      {data ? (
        <Box className={s.container}>
          <Card className={s.sideContainer} variant={"outlined"}>
            <Box className={s.sortContainer}>
              <SelectItemsCount />
              <SortComponent />
            </Box>
            <SelectComponent setCurrencyType={currencyType} />
          </Card>
          <Card className={s.contentContainer} variant={"outlined"}>
            <CardItem items={cars?.data} currencyType={currency} />
            <Pagination
              sx={{ marginTop: "30px" }}
              count={amountPages}
              page={cars?.page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
            />
          </Card>
        </Box>
      ) : null}
    </>
  );
};

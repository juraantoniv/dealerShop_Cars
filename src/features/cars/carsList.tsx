import { Card } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { CardItem } from "../../components/card/cardItem";
import { userThunks } from "../../store/slices";
import { selectCars, useAppDispatch } from "../../store/store";

export const CarList = () => {
  const dispatch = useAppDispatch();

  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(userThunks.fetchGoods());
  }, [dispatch]);

  return (
    <div className="App">
      <CardItem items={cars.data} />
    </div>
  );
};

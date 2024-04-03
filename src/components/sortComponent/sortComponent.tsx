import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React from "react";
import { useSelector } from "react-redux";

import { userActions, userThunks } from "../../store/slices";
import {
  selectCars,
  selectCount,
  setOffset,
  sortDirection,
  useAppDispatch,
} from "../../store/store";
import s from "./sortComponent.module.css";

export const SortComponent = () => {
  const direction = useSelector(sortDirection);
  const dispatch = useAppDispatch();
  const cars = useSelector(selectCars);
  const skip = useSelector(setOffset);

  const sortDirectionItem = () => {
    dispatch(userActions.setSort(!direction));
    dispatch(
      userThunks.fetchGoods({
        limit: String(cars?.limit),
        offset: skip.toString(),
        ORDER: direction ? "ASC" : "DESC",
      }),
    );
  };
  return (
    <div className={s.sortContainer} onClick={sortDirectionItem}>
      Sort
      {direction ? (
        <ArrowDropDownIcon fontSize={"large"} />
      ) : (
        <ArrowDropUpIcon fontSize={"large"} />
      )}
    </div>
  );
};

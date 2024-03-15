import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React, { useState } from "react";

import s from "./sortComponent.module.css";

type SortComponentType = {
  sortDirectionCallBack: (direc: boolean) => void;
};

export const SortComponent: React.FC<SortComponentType> = ({
  sortDirectionCallBack,
}) => {
  const [sort, serSort] = useState<boolean>(false);

  const sortDirection = () => {
    serSort(!sort);
    sortDirectionCallBack(sort);
  };
  return (
    <div className={s.sortContainer} onClick={sortDirection}>
      Sort
      {sort ? (
        <ArrowDropDownIcon fontSize={"large"} />
      ) : (
        <ArrowDropUpIcon fontSize={"large"} />
      )}
    </div>
  );
};

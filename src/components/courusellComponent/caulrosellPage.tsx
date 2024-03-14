import React from "react";

import { ReactSlickDemo } from "./caurusell";
import TopButtons from "./topButtons";

export const CaurusellPage = () => {
  const onChangeHandler = () => {};

  return (
    <>
      <TopButtons callback={onChangeHandler} />
      <ReactSlickDemo />
    </>
  );
};

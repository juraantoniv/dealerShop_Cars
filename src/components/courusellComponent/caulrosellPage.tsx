import { Box } from "@mui/material";
import React, { useState } from "react";

import { ReactSlickDemo } from "./caurusell";
import TopButtons from "./topButtons";

export const CaurusellPage = () => {
  const [play, setPlay] = useState(true);
  const onChangeHandler = (play: boolean) => {
    setPlay(play);
  };

  return (
    <Box>
      <TopButtons callback={onChangeHandler} />
      <ReactSlickDemo />
    </Box>
  );
};

import { Box } from "@mui/material";
import React, { useState } from "react";

import IconPauseCircle from "../svg/pause";
import { IconPlayCircle } from "../svg/play";

type Buttons = {
  callback: (el: boolean) => void;
};

const TopButtons = React.memo(function (props: Buttons) {
  const [play, setPlay] = useState(true);

  const onPlayHandler = () => {
    setPlay(!play);
    props.callback(play);
  };

  return (
    <Box onClick={onPlayHandler}>
      {play ? <IconPauseCircle /> : <IconPlayCircle />}
    </Box>
  );
});

export default TopButtons;

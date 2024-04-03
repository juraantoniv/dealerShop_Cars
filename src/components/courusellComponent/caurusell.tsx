import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styless.css";

import { Box, Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { findValueByKey } from "../../common/func/findCurrency";
import { selectCars } from "../../store/store";
import IconPauseCircle from "../svg/pause";
import { IconPlayCircle } from "../svg/play";
import s from "./caulrosell.module.css";

type CauruselType = {
  variant: string;
};

export const ReactSlickDemo = () => {
  const cars = useSelector(selectCars);
  const settings = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    cssEase: "linear",
  };

  return (
    <Card className={s.box}>
      <Slider key="slider-on" {...settings}>
        {cars?.data?.map((car) => (
          <Card>
            <Typography>{car?.brand}</Typography>
            <CardMedia
              sx={{ borderRadius: "10px" }}
              component="img"
              height="100"
              image={car.image}
            />
            <Typography>{car?.model}</Typography>
            <Typography fontStyle={"oblique"} fontSize={"large"}>
              {findValueByKey(car.currency, "UAH")} UAH
            </Typography>
          </Card>
        ))}
      </Slider>
    </Card>
  );
};

import {
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DataCars } from "../../common/types/types";
import { carsApiService } from "../../services/cars.service";
import { carId, selectCars } from "../../store/store";
import { CaurusellPage } from "../courusellComponent/caulrosellPage";
import { ReactSlickDemo } from "../courusellComponent/caurusell";
import { IconEye } from "../svg/eye";
import { IconHeart } from "../svg/heart";
import s from "./car.module.css";

export const CarViews = () => {
  const [car, setCar] = useState<DataCars>();
  const { data } = useSelector(selectCars);
  const id = useSelector(carId);

  useEffect(() => {
    carsApiService.getById(id).then((data) => {
      setCar(data.data);
    });
  }, []);

  return (
    <Box className={s.container}>
      {data ? (
        <Card>
          <Card className={s.car}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="350"
                image={car?.image}
                alt="car"
                className={s.carImg}
              />
              <CardContent>
                <Box className={s.boxCurrency}>
                  <Typography gutterBottom variant="h5" component="div">
                    {car?.brand}
                  </Typography>
                </Box>
                <Typography
                  fontFamily={"cursive"}
                  gutterBottom
                  variant="h6"
                  component="span"
                >
                  {car?.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {car?.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={s.cardActions}>
              <Button size="medium" color="primary" disabled>
                <Badge
                  color={"success"}
                  badgeContent={car?.likes?.length ? car?.likes?.length : 0}
                >
                  <IconHeart />
                </Badge>
              </Button>
              <Button size="medium" color="primary">
                <Badge
                  color={"success"}
                  badgeContent={car?.views?.length ? car.views?.length : 0}
                >
                  <IconEye />
                </Badge>
              </Button>
            </CardActions>
          </Card>
        </Card>
      ) : null}
    </Box>
  );
};

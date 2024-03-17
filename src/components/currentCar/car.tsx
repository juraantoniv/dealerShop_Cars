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
import { carId } from "../../store/store";
import s from "../card/cardItem.module.css";
import { IconEye } from "../svg/eye";
import { IconHeart } from "../svg/heart";

export const CarViews = () => {
  const [car, setCar] = useState<DataCars>();
  const id = useSelector(carId);

  useEffect(() => {
    carsApiService.getById(id).then((data) => {
      setCar(data.data);
    });
  }, []);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={car?.image}
          alt="green iguana"
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
  );
};

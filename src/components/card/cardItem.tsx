import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

import { DataCars } from "../../common/types/types";
import { IconEye } from "../svg/eye";
import { IconHeart } from "../svg/heart";
import s from "./cardItem.module.css";

type cardContent = {
  items: Array<DataCars>;
};

export const CardItem: React.FC<cardContent> = ({ items }) => {
  return (
    <Grid container spacing={3} gap={10}>
      {items?.map((el) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={el.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={s.cardActions}>
            <Button size="small" color="primary">
              <Badge badgeContent={el.likes?.length}>
                <IconHeart />
              </Badge>
            </Button>
            <Button size="small" color="primary">
              <Badge badgeContent={el.views?.length}>
                <IconEye />
              </Badge>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

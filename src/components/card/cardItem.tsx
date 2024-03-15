import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { findValueByKey } from "../../common/func/findCurrency";
import { DataCars } from "../../common/types/types";
import { userThunks } from "../../store/slices";
import { selectCount, setOffset, useAppDispatch } from "../../store/store";
import { IconEye } from "../svg/eye";
import { IconHeart } from "../svg/heart";
import s from "./cardItem.module.css";

type cardContent = {
  items: Array<DataCars>;
};

export const CardItem: React.FC<cardContent> = ({ items }) => {
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const skip = useSelector(setOffset);
  console.log(skip);
  const likeCar = (id: string) => {
    dispatch(userThunks.likeCar(id))
      .unwrap()
      .then((data) => {
        dispatch(
          userThunks.fetchGoods({
            limit: itemPage.toString(),
            offset: skip.toString(),
          }),
        );
      })
      .catch((er) => {
        dispatch(
          userThunks.fetchGoods({
            limit: itemPage.toString(),
            offset: skip.toString(),
          }),
        );
        toast.error(`${er}`);
        console.log(er);
      });
  };

  return (
    <Grid
      container
      className={s.contentContainer}
      columns={{ xs: 2, md: 2 }}
      gap={3}
    >
      {items?.map((el) => (
        <Card sx={{ width: "15% " }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="50%"
              image={el.image}
              alt="green iguana"
            />
            <CardContent>
              <Box className={s.boxCurrency}>
                <Typography gutterBottom variant="h5" component="div">
                  {el.brand}
                </Typography>
                <Typography variant={"caption"} fontWeight={"bold"}>
                  {findValueByKey(el.currency, "UAH")} UAH
                </Typography>
              </Box>
              <Typography
                fontFamily={"cursive"}
                gutterBottom
                variant="h6"
                component="span"
              >
                {el.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={s.cardActions}>
            <Button
              size="medium"
              color="primary"
              onClick={() => likeCar(el.id)}
            >
              <Badge
                color={"success"}
                badgeContent={el.likes?.length ? el.likes?.length : 0}
              >
                <IconHeart />
              </Badge>
            </Button>
            <Button size="medium" color="primary">
              <Badge
                color={"success"}
                badgeContent={el.views?.length ? el.views?.length : 0}
              >
                <IconEye />
              </Badge>
            </Button>
          </CardActions>
          <Button
            sx={{ margin: "1em" }}
            color="primary"
            aria-label="add to shopping cart"
            startIcon={<AddShoppingCartIcon />}
            variant={"contained"}
          >
            ORDER
          </Button>
          <ToastContainer />
        </Card>
      ))}
    </Grid>
  );
};

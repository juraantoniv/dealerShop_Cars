import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import InfoIcon from "@mui/icons-material/Info";
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { findValueByKey } from "../../common/func/findCurrency";
import { DataCars } from "../../common/types/types";
import { userActions, userThunks } from "../../store/slices";
import { selectCount, setOffset, useAppDispatch } from "../../store/store";
import { CarOrder } from "../postCarForm/carOrder";
import { IconEye } from "../svg/eye";
import { IconHeart } from "../svg/heart";
import s from "./cardItem.module.css";

type cardContent = {
  items: Array<DataCars>;
  currencyType: string;
};

export const CardItem: React.FC<cardContent> = ({ items, currencyType }) => {
  const dispatch = useAppDispatch();
  const itemPage = useSelector(selectCount);
  const skip = useSelector(setOffset);
  const navigate = useNavigate();
  const likeCar = (id: string) => {
    dispatch(userThunks.likeCar(id))
      .unwrap()
      .then(() => {
        dispatch(
          userThunks.fetchGoods({
            limit: itemPage.toString(),
            offset: skip.toString(),
          }),
        );
      })
      .catch((e) => {
        dispatch(
          userThunks.fetchGoods({
            limit: itemPage.toString(),
            offset: skip.toString(),
          }),
        );
        console.log(e);
        toast.error(`${e}`);
      });
  };

  const viewsHandler = (id: string) => {
    dispatch(userActions.setCarId(id));
    navigate("carInfo");
  };

  const cur = currencyType ? currencyType : "UAH";

  return (
    <Grid container spacing={1} className={s.contentContainer} gap={3}>
      {items?.map((el) => (
        <Grid xs={2} sx={{ minHeight: "200px" }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150px"
                image={el.image}
                alt="green iguana"
              />
              <CardContent>
                <Box className={s.boxCurrency}>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.brand}
                  </Typography>
                  <Typography variant={"caption"} fontSize={"large"}>
                    {findValueByKey(
                      el.currency,
                      currencyType ? currencyType : "UAH",
                    )}
                    <Typography fontStyle={"inherit"} variant={"button"}>
                      {cur === "EUR" ? (
                        <EuroIcon />
                      ) : cur === "USD" ? (
                        <AttachMoneyIcon />
                      ) : (
                        "UAH"
                      )}
                    </Typography>
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
            <CarOrder id={el.id} />
            <Button
              variant={"contained"}
              startIcon={<InfoIcon />}
              onClick={() => viewsHandler(el.id)}
            >
              Info
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

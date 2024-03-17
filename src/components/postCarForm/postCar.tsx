import { zodResolver } from "@hookform/resolvers/zod";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

import { userThunks } from "../../store/slices";
import {
  selectCars,
  selectCount,
  setOffset,
  useAppDispatch,
} from "../../store/store";

const Schema = z.object({
  brand: z.string().min(1),
  brand2: z.string().optional(),
  description: z.string().min(1, { message: "error" }),
  model: z.string().min(1, { message: "error" }),
  price: z.string().min(1, { message: "error" }),
  image: z.any(),
});

export type FormType = z.infer<typeof Schema>;

export default function PostCarDialog() {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
  });
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const skip = useSelector(setOffset);
  const itemPage = useSelector(selectCount);
  const [sortDirection, setSort] = useState<boolean>(false);
  const cars = useSelector(selectCars);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data: FormType) => {
    // formData.append("questionImg", data);

    try {
      dispatch(
        userThunks.postCar({
          ...data,
          brand: data.brand2 ? data.brand2 : data.brand,
          image: data.image[0],
        }),
      ).then(() => {
        toast.info(`Car ${data.model} was  created `, {
          position: "bottom-right",
        });
      });
      dispatch(
        userThunks.fetchGoods({
          limit: String(cars?.limit),
          offset: skip.toString(),
          ORDER: sortDirection ? "ASC" : "DESC",
        }),
      );
      handleClose();
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<AddShoppingCartIcon />}
        variant="contained"
        onClick={handleClickOpen}
      >
        ADD CAR
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please add you car that you want to post"}
        </DialogTitle>
        <DialogContent>
          <Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                component="label"
                style={{ margin: "1em" }}
              >
                Upload PHOTO
                <input
                  {...register("image")}
                  name={"image"}
                  type="file"
                  hidden
                />
              </Button>
              <TextField
                {...register("model")}
                name={"model"}
                size={"small"}
                helperText="Please enter model of car"
                id="demo-helper-text-aligned"
                label="model"
              />

              <TextField
                {...register("brand")}
                name={"brand"}
                id="outlined-select-currency"
                select
                size={"small"}
                label="Brand"
                defaultValue="Mercedes"
                helperText="Please select brand"
              >
                <MenuItem key={"Mercedes"} value={"Mercedes"}>
                  Mercedes
                </MenuItem>
                <MenuItem key={"Opel"} value={"Opel"}>
                  Opel
                </MenuItem>
                <MenuItem key={"Opel"} value={"BMW"}>
                  BMW
                </MenuItem>
              </TextField>
              <Typography variant={"subtitle2"}>
                If you didn't found your car write down it
              </Typography>
              <TextField
                {...register("brand2")}
                name={"brand2"}
                size={"small"}
                helperText="Please enter brand of car"
                id="demo-helper-text-aligned"
                label="brand"
              />
              <TextField
                {...register("description")}
                name={"description"}
                size={"small"}
                helperText="Please describe your car"
                id="demo-helper-text-aligned"
                label="description"
              />
              <TextField
                {...register("price")}
                name={"price"}
                helperText="Please enter price "
                size={"small"}
                id="demo-helper-text-aligned-no-helper"
                label="price"
              />
              <Button
                startIcon={<PostAddIcon />}
                variant={"contained"}
                type={"submit"}
              >
                Post
              </Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

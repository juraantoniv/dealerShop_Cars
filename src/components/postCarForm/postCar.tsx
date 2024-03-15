import { zodResolver } from "@hookform/resolvers/zod";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { userActions, userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}

const Schema = z.object({
  brand: z.string().min(1),
  brand2: z.string().optional(),
  description: z.string().min(1, { message: "error" }),
  model: z.string().min(1, { message: "error" }),
  price: z.string().min(1, { message: "error" }),
  image: z.any(),
});

export type FormType = z.infer<typeof Schema>;

export default function AlertDialog() {
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
  console.log(errors);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data: FormType) => {
    const formData = new FormData();

    // formData.append("questionImg", data);

    dispatch(
      userThunks.postCar({
        ...data,
        brand: data.brand2 ? data.brand2 : data.brand,
        image: data.image[0],
      }),
    );
    dispatch(userThunks.fetchGoods());
    handleClose();
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
                If you didn't found your of car write down
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

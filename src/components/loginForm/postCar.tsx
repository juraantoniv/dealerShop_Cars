import { zodResolver } from "@hookform/resolvers/zod";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoginIcon from "@mui/icons-material/Login";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { MenuItem, TextField, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { userActions, userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import { LoginFrom } from "../loginComponent/loginComponent";

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

export default function LoginDiag() {
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
    <div>
      <Button
        startIcon={<LoginIcon />}
        variant="contained"
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <Dialog
        children={<LoginFrom />}
        open={open}
        onClose={handleClose}
        fullWidth={true}
      ></Dialog>
    </div>
  );
}

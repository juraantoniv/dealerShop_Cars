import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { authService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/store";
import s from "./createAccount.module.css";

const Schema = z
  .object({
    name: z.string().min(1),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    age: z.string().min(1, { message: "error" }),
    email: z.string().email(),
    city: z.string().min(1, { message: "error" }),
    file: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
      });
    }

    return data;
  });

export type FormTypeCreateUser = z.infer<typeof Schema>;

export default function PostUserDialog() {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormTypeCreateUser>({
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
  const onSubmit = async (data: FormTypeCreateUser) => {
    console.log(data);
    try {
      await authService.createUser({ ...data, file: data.file[0] });
      handleClose();
      toast.info("User created");
    } catch (e) {
      toast.error("Something wrong happened");
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Box className={s.container}>
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
            <input {...register("file")} name={"file"} type="file" hidden />
          </Button>
          <TextField
            {...register("name")}
            name={"name"}
            size={"small"}
            helperText="Please enter name"
            id="demo-helper-text-aligned"
            label="name"
          />
          <TextField
            {...register("age")}
            name={"age"}
            size={"small"}
            helperText="Please enter ager"
            id="demo-helper-text-aligned"
            label="age"
          />
          <TextField
            {...register("city")}
            name={"city"}
            helperText="Please enter city "
            size={"small"}
            id="demo-helper-text-aligned-no-helper"
            label="city"
          />
          <TextField
            {...register("email")}
            name={"email"}
            helperText="Please enter email "
            size={"small"}
            id="demo-helper-text-aligned-no-helper"
            label="email"
          />
          <TextField
            {...register("password")}
            name={"password"}
            size={"small"}
            helperText="Please enter password"
            id="demo-helper-text-aligned"
            label="password"
          />
          <TextField
            {...register("confirmPassword")}
            name={"confirmPassword"}
            size={"small"}
            helperText={errors.confirmPassword?.message}
            id="demo-helper-text-aligned"
            label="confirmPassword"
            error={!!errors.confirmPassword?.message}
            sx={{ marginBottom: "15px" }}
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
    </React.Fragment>
  );
}

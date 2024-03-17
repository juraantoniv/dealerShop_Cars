import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { authService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/store";
import s from "./ChangePassword.module.css";

const Schema = z
  .object({
    old_password: z.string().min(1).max(10),
    new_password1: z.string().min(1).max(10),
    new_password2: z.string().min(1).max(10),
  })
  .superRefine((data, ctx) => {
    if (data.new_password1 !== data.new_password2) {
      ctx.addIssue({
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
      });
    }

    return data;
  });

export type FormTypeForChangePassword = z.infer<typeof Schema>;

export const ChangePassword = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormTypeForChangePassword>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormTypeForChangePassword) => {
    try {
      await authService.changePassword(data);
      toast.info("Password was changed", {
        type: "success",
        theme: "colored",
      });
    } catch (e) {
      toast.error("Something went wrong", {
        type: "error",
        theme: "colored",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={s.container}
    >
      <Typography component={"p"}>
        Change your password here. After saving, you'll be logged out.
      </Typography>
      <TextField
        {...register("old_password")}
        name="old_password"
        type="password"
        size={"small"}
        label="Current password"
      />
      <TextField
        {...register("new_password1")}
        name={"new_password1"}
        type="password"
        size={"small"}
        label="New password"
      />
      <TextField
        {...register("new_password2")}
        name={"new_password2"}
        type="password"
        size={"small"}
        label={"Confirm password"}
      />

      {/*{!!errors ? (*/}
      {/*  <Typography style={{ color: "red" }} variant={"subtitle2"}>*/}
      {/*    Passwords do not match*/}
      {/*  </Typography>*/}
      {/*) : null}*/}
      <Button type={"submit"} startIcon={<SaveIcon />}>
        Change password
      </Button>
    </Box>
  );
};

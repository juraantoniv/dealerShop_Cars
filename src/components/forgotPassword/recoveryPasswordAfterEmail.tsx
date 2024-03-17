import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { authService } from "../../services/auth.service";
import s from "../loginComponent/ChangePassword.module.css";

const Schema = z.object({
  new_password: z.string().min(1).max(10),
});

export type FormTypeForRecovery = z.infer<typeof Schema>;
export const RecoveryPasswordAfterEmail = () => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormTypeForRecovery>({
    resolver: zodResolver(Schema),
  });
  const { token } = useParams<string>();

  const onSubmit = async (data: FormTypeForRecovery) => {
    try {
      if (token) {
        await authService.recoveryPassword(data.new_password, token);
      }

      toast.info("Password was recovered", {
        type: "success",
        theme: "colored",
      });
    } catch (e) {
      toast.error("Error token", {
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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      <TextField
        {...register("new_password")}
        name={"new_password"}
        type="password"
        size={"small"}
        label={"Confirm password"}
      />
      <Button type={"submit"} startIcon={<SaveIcon />}>
        Change password
      </Button>
    </Box>
  );
};

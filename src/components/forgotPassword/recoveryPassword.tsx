import "./recoveryPassword.module.css";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { authService } from "../../services/auth.service";
import s from "./recoveryPassword.module.css";

const Schema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
});

export type FormTypeEmail = z.infer<typeof Schema>;

const RecoveryPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypeEmail>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormTypeEmail) => {
    try {
      await authService.forgotPassword(data.email);
      toast.warn("Please check your email", {
        type: "info",
        theme: "colored",
      });
    } catch (e) {
      toast.warn(`${e}`);
    }
  };

  return (
    <Card className={s.TabsRoot} variant={"outlined"}>
      <p className="Text">Recovery your password here</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Email
          </label>
          <input
            {...register("email")}
            className="Input"
            id="name"
            name={"email"}
            defaultValue="your@email.com"
          />
          {errors.email?.message && <span>{errors?.email?.message}</span>}
        </fieldset>
        <Button variant={"contained"}>Recovery</Button>
      </form>
    </Card>
  );
};

export default RecoveryPassword;

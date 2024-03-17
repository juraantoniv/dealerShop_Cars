import "./recoveryPassword.module.css";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
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
    <div className={s.TabsRoot}>
      <div className={s.TabsContent}>
        <p className="Text">
          Make changes to your account here. Click save when you're done.
        </p>
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
          <button className="Button green">Recovery</button>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPassword;

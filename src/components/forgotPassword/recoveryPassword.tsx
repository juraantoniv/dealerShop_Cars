import "./recoveryPassword.module.css";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Tabs from "@radix-ui/react-tabs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import s from "./recoveryPassword.module.css";

const Schema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
});

export type FormType = z.infer<typeof Schema>;

const RecoveryPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormType) => {
    try {
    } catch (e: any) {
      toast.warn(`${e.response.data}`);
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
              defaultValue="Pedro Duarte"
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

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import * as Tabs from "@radix-ui/react-tabs";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  setLocalAccessToken,
  setLocalRefreshToken,
} from "../../common/localStorage/local.storege";
import { authService } from "../../services/auth.service";
import { userActions, userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import { RecoveryPasswordDiag } from "../forgotPassword/LoginDiag";

const Schema = z.object({
  password: z.string().min(1),
  email: z.string().email({ message: "error" }),
});

export type FormType = z.infer<typeof Schema>;

export const LoginFrom = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: FormType) => {
    authService
      .login(data)
      .then((r) => {
        console.log(r);

        setLocalAccessToken(r?.data?.tokens.accessToken);
        setLocalRefreshToken(r?.data?.tokens.refreshToken);
        dispatch(userActions.setCurrenUser(r.data.user));

        dispatch(userThunks.fetchGoods());
        toast.info(`Welcome ${r?.data?.user.name} in our platform!`, {
          position: "bottom-right",
        });
      })
      .catch((e) => {
        toast.warn(`${e.response?.data}`);
      });
  };

  return (
    <>
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="Manage your account">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Password
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
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
                defaultValue="juraantoniv@gmail.com"
              />
              {errors.email?.message && <span>{errors?.email?.message}</span>}
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="username">
                Password
              </label>
              <input
                {...register("password")}
                className="Input"
                id="username"
                defaultValue="@peduarte"
              />
              {errors.password && <span>This field is required</span>}
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <RecoveryPasswordDiag />
              <button className="Button green">LogIn</button>
            </div>
          </form>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <p className="Text">
            Change your password here. After saving, you'll be logged out.
          </p>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="currentPassword">
              Current password
            </label>
            <input className="Input" id="currentPassword" type="password" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="newPassword">
              New password
            </label>
            <input className="Input" id="newPassword" type="password" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input className="Input" id="confirmPassword" type="password" />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button className="Button green">Change password</button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

import React from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import RecoveryPassword from "../components/forgotPassword/recoveryPassword";
import { RecoveryPasswordAfterEmail } from "../components/forgotPassword/recoveryPasswordAfterEmail";
import { ChangePassword } from "../components/loginComponent/ChangePassword";
import { SignUp } from "../components/myAccountForm/CreateAccountNew";
import { CarList } from "../features/cars/carsList";
import { MainLayout } from "../layouts/mainLayout";

const privateRoutes: RouteObject[] = [
  {
    path: "",
    element: <CarList />,
  },
  {
    path: "create",
    element: <SignUp />,
  },
  {
    path: "forgot_password",
    element: <RecoveryPassword />,
  },
  {
    path: "forgotWithToken/:token",
    element: <RecoveryPasswordAfterEmail />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

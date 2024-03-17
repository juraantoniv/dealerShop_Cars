import React from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import RecoveryPassword from "../components/forgotPassword/recoveryPassword";
import { ChangePassword } from "../components/loginComponent/loginComponent";
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
    path: "change_password",
    element: <ChangePassword />,
  },
  {
    path: "forgot_password",
    element: <RecoveryPassword />,
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

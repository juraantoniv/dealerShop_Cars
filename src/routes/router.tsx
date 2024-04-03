import React from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { CarViews } from "../components/currentCar/car";
import RecoveryPassword from "../components/forgotPassword/recoveryPassword";
import { RecoveryPasswordAfterEmail } from "../components/forgotPassword/recoveryPasswordAfterEmail";
import { SignUp } from "../components/myAccountForm/createAccountNew";
import { ReactImageGallery } from "../components/React-image-gallery/react-image-gallery";
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
  {
    path: "carInfo",
    element: <CarViews />,
  },
  {
    path: "gallery",
    element: <ReactImageGallery />,
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

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import RecoveryPassword from "../components/forgotPassword/recoveryPassword";
import { CarList } from "../features/cars/carsList";
import { MainLayout } from "../layouts/mainLayout";

const privateRoutes: RouteObject[] = [
  {
    path: "",
    element: <CarList />,
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

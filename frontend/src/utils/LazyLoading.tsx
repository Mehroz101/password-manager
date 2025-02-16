import { lazy } from "react";

export const Auth_Page = lazy(()=> import("../pages/Auth_Page"))
export const Home = lazy(() => import("../pages/Home"));
export const Layout = lazy(()=>import ("../layout/Layout"))
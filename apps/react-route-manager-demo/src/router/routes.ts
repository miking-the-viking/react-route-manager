// import { lazy } from "react";
import { WELCOME } from "../app/pages/Welcome/Welcome.route";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { USERS } from "../app/pages/Users/Users.route";

export const routes: RouteConfig<any>[] = [WELCOME, USERS];

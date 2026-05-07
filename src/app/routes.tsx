import { createBrowserRouter, Navigate } from "react-router";
import { UserLayout } from "./components/layout/UserLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

import { Landing } from "./components/user/Landing";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { Activate } from "./components/user/Activate";
import { Dashboard } from "./components/user/Dashboard";
import { RideHistory } from "./components/user/RideHistory";
import { EWallet } from "./components/user/EWallet";
import { Carbon } from "./components/user/Carbon";
import { DamageReport } from "./components/user/DamageReport";
import { Notifications } from "./components/user/Notifications";

import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminTracking } from "./components/admin/AdminTracking";
import { AdminLogs } from "./components/admin/AdminLogs";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminReports } from "./components/admin/AdminReports";
import { AdminDamage } from "./components/admin/AdminDamage";
import { AdminSettings } from "./components/admin/AdminSettings";
import { AdminOverride } from "./components/admin/AdminOverride";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/activate",
    Component: Activate,
  },
  {
    path: "/app",
    Component: UserLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "rides", Component: RideHistory },
      { path: "wallet", Component: EWallet },
      { path: "carbon", Component: Carbon },
      { path: "report", Component: DamageReport },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "tracking", Component: AdminTracking },
      { path: "logs", Component: AdminLogs },
      { path: "users", Component: AdminUsers },
      { path: "reports", Component: AdminReports },
      { path: "damage", Component: AdminDamage },
      { path: "settings", Component: AdminSettings },
      { path: "override", Component: AdminOverride },
    ],
  },
]);

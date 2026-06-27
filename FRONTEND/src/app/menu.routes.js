import {
  LayoutDashboard,
  FolderTree,
  Settings2,
  ChartColumn,
  Settings,
  History,
} from "lucide-react";

export const menuRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Inspection",
    icon: History,
    path: "/inspection",
  },
  {
    label: "Master Data",
    icon: FolderTree,
    children: [
      {
        label: "Categories",
        path: "/categories",
      },
      {
        label: "Machines",
        path: "/machines",
      },
    ],
  },
  {
    label: "Rollers",
    icon: Settings2,
    children: [
      {
        label: "Roller List",
        path: "/rollers",
      },
      {
        label: "Installation",
        path: "/installations",
      },
    ],
  },
  {
    label: "Report",
    icon: ChartColumn,
    path: "/reports",
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      {
        label: "Roles",
        path: "/roles",
      },
      {
        label: "Users",
        path: "/setting/users",
      },
    ],
  },
];

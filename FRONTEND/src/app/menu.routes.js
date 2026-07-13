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
    path: "/inspections",
  },
  {
    label: "Master Data",
    icon: FolderTree,
    children: [
      {
        label: "Categories",
        path: "/master/categories",
      },
      {
        label: "Type Machines",
        path: "/master/type",
      },
      {
        label: "Machines",
        path: "/master/machines",
      },
      // {
      //   label: "Position",
      //   path: "/master/machine/:positionId/position",
      // },
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
      // {
      //   label: "Roles",
      //   path: "/setting/role",
      // },
      {
        label: "Users",
        path: "/setting/users",
      },
    ],
  },
];

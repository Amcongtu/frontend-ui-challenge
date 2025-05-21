// routesConfig.ts
export interface RouteMeta {
  path: string;
  name: string;
  icon?: React.ReactNode; // optional icon if you want
  // You can add more fields like roles, layout type, description, etc.
}

export const routesConfig: RouteMeta[] = [
  { path: "/", name: "Home" },
  { path: "/community", name: "Community" },
  { path: "/suppliers", name: "Suppliers" },
  { path: "/notification", name: "Notification" },
  { path: "/event", name: "Event" },
  // add other routes here as needed
];

export function getRouteMeta(pathname: string): RouteMeta | undefined {
  return routesConfig.find((route) => route.path === pathname);
}

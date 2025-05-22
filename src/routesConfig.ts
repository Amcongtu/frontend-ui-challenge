interface RouteMeta {
  path: string;
  name: string;
  pattern?: RegExp; // new
}

export const routesConfig: RouteMeta[] = [
  { path: "/", name: "Home" },
  { path: "/community", name: "Community" },
  {
    path: "/community/:id",
    name: "Post Detail",
    pattern: /^\/community\/[^/]+$/,
  },
  { path: "/suppliers", name: "Suppliers" },
  { path: "/suppliers/:id", name: "Suppliers Detail",  pattern: /^\/suppliers\/[^/]+$/ },
  { path: "/event", name: "Event" },
  { path: "/event/:id", name: "Event Detail", pattern: /^\/event\/[^/]+$/ },
];

export function getRouteMeta(pathname: string): RouteMeta | undefined {
  return routesConfig.find(
    (route) => pathname === route.path || route.pattern?.test(pathname)
  );
}

const authRoutes = {
  login: "/login",
  register: "/register",
};

export const siteRoutes = {
  root: "/",
  explore: "/explore",
  ...authRoutes,
};

import Signup from "scenes/Signup/Signup";
import Home from "scenes/Home/Home";
import Login from "scenes/Login/Login";
import Dashboard from "scenes/Dashboard/Dashboard";

export const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "signup",
    path: "/signup",
    component: Signup,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    roles: "user",
  },
];

const compile = (parentRoute, subRoutes) => {
  return subRoutes.flatMap((subRoute) => {
    const newRoute = {
      name: subRoute.name,
      path: parentRoute.path + subRoute.path,
      component: subRoute.component,
      roles: (parentRoute.roles || []).concat(subRoute.roles || []),
    };
    return subRoute.routes
      ? [newRoute, ...compile(newRoute, subRoute.routes)]
      : newRoute;
  });
};

export const getRoutes = () => {
  const parentRoute = {
    name: "",
    path: "",
  };
  const flatRoutes = compile(parentRoute, routes);
  return flatRoutes;
};

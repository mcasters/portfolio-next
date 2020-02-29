import Routes, * as nextRoutes from "next-routes";

export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link;

routes.add("confirm", "/user/confirm/:token");
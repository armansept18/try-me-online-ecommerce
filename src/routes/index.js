import { LoginPage } from "../pages/account/login";
import { RegisterPage } from "../pages/account/register";
import { Homepage } from "../pages/home/homepage";
import { ProtectedPage } from "./protected-page";

class RouteClass {
  constructor(path, element, needLogin = false) {
    this.path = path;
    this.element = "";
    //   <ProtectedPage needLogin={needLogin}>{element}</ProtectedPage>
  }
}

export const routes = [
  new RouteClass("/login", <LoginPage />),
  new RouteClass("/register", <RegisterPage />),
  new RouteClass("/home", <Homepage />),
];

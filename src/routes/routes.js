import { Dashboard } from "../pages/account/dashboard";
import { LoginPage } from "../pages/account/login";
import { RegisterPage } from "../pages/account/register";
import { Homepage } from "../pages/home/homepage";
import { ProductDetail } from "../pages/products/product-detail";
import { ProductPage } from "../pages/products/product-page";
import { Redirect } from "../pages/redirect/redirect";
import { ProtectedPage } from "./protected-page";

class RouteClass {
  constructor(path, element, needLogin = false, guestOnly = false) {
    this.path = path;
    this.element = (
      <ProtectedPage needLogin={needLogin} guestOnly={guestOnly}>
        {element}
      </ProtectedPage>
    );
  }
}

export const routes = [
  new RouteClass("login", <LoginPage />, false, true),
  new RouteClass("register", <RegisterPage />, false, true),
  new RouteClass("home", <Homepage />),
  new RouteClass("products", <ProductPage />),
  new RouteClass("product-detail/:productId", <ProductDetail />),
  new RouteClass("account", <Dashboard />, true, false),
  new RouteClass("*", <Redirect />),
];

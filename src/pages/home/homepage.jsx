import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { LoginPage } from "../account/login";
import { RegisterPage } from "../account/register";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      {/* <LoginPage /> */}
      <RegisterPage />
      <Footer />
    </>
  );
};

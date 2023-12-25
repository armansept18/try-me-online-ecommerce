import { styled } from "@mui/material/styles";
import { Button, Divider } from "@mui/material";
import Logo from "../../public/images/logo.png";

const StyledNavButton = styled(Button)({
  fontFamily: "Quicksand",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "0.56px",
  color: "#252525",
});
const StyledFooterButton = styled(Button)({
  fontFamily: "Quicksand",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "150%",
  letterSpacing: "0.49px",
  color: "#252525",
});

export const Footer = () => {
  return (
    <>
      <footer className="flex flex-col mr-16 ml-16">
        <div className="flex justify-center items-center">
          <img
            src={Logo}
            alt=""
            style={{
              maxWidth: "250px",
              maxHeight: "84px",
              width: "100vw",
              height: "100vh",
            }}
          />
        </div>
        <div className="gap-8 mt-8 mb-8">
          <StyledNavButton>Home</StyledNavButton>
          <StyledNavButton>Products</StyledNavButton>
          <StyledNavButton>About</StyledNavButton>
          <StyledNavButton>Account</StyledNavButton>
        </div>
        <Divider variant="fullwidth" />
        <div className="flex justify-between mt-8">
          <p>2022 Relume. All right reserved.</p>
          <div>
            <StyledFooterButton>Privacy Policy</StyledFooterButton>
            <StyledFooterButton>Terms of Service</StyledFooterButton>
            <StyledFooterButton>Cookies Settings</StyledFooterButton>
          </div>
        </div>
      </footer>
    </>
  );
};

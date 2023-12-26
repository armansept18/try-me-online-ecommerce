import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Divider,
  ImageList,
  Typography,
} from "@mui/material";
import Logo from "../../public/images/logo.png";
import { Homepage } from "../../pages/home/homepage";

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
    <Box sx={{ marginTop: 80 }}>
      <ImageList
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      </ImageList>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <StyledNavButton href="/home">Home</StyledNavButton>
        <StyledNavButton>Products</StyledNavButton>
        <StyledNavButton>About</StyledNavButton>
        <StyledNavButton>Account</StyledNavButton>
      </Box>
      <Box>
        <Divider variant="middle" sx={{ marginTop: "64px" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Quicksand",
          }}
        >
          2022 Relume. All right reserved.
        </Typography>
      </Box>
    </Box>
  );
};

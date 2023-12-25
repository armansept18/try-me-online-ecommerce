import { styled } from "@mui/material/styles";
import { Badge, Button, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Logo from "../../public/images/logo.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const StyledButton = styled(Button)({
  fontFamily: "Quicksand",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "0.56px",
  color: "#252525",
});

export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between sticky top-0 mr-16 ml-16">
        <div>
          <img
            src={Logo}
            alt=""
            style={{
              maxWidth: "180px",
              maxHeight: "61px",
              width: "100vw",
              height: "100vh",
            }}
          />
        </div>
        <div className="flex items-center gap-5">
          <StyledButton>Home</StyledButton>
          <StyledButton>Products</StyledButton>
          <StyledButton>About</StyledButton>
          <StyledButton>Account</StyledButton>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={100} color="error" max={99}>
              <ShoppingCart />
            </StyledBadge>
          </IconButton>
        </div>
      </nav>
    </>
  );
};

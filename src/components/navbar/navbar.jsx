import { styled } from "@mui/material/styles";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ImageList,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../public/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const pages = ["Home", "Products", "About"];
const account = ["Login", "Register"];
const accountLoggedIn = ["Profile", "Order", "Address", "Logout"];

export const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);

  const handleOpenNav = (event) => setAnchorNav(event.currentTarget);
  const handleCloseNav = () => setAnchorNav(null);
  const handleOpenUser = (event) => setAnchorUser(event.currentTarget);
  const handleCloseUser = () => setAnchorUser(null);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNav}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#252525" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorNav)}
                onClose={handleCloseNav}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem ket={page} onClick={handleCloseNav}>
                    <StyledButton
                      textAlign="center"
                      component={Link}
                      to={`/${page.toLowerCase()}`}
                    >
                      {page}
                    </StyledButton>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <ImageList sx={{ display: { xs: "flex", md: "none" } }}>
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
            </ImageList>

            <ImageList sx={{ display: { xs: "none", md: "flex" } }}>
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
            </ImageList>
            <Box
              className="flex items-center"
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                marginRight: 5,
                gap: 5,
              }}
            >
              {pages.map((page) => (
                <StyledButton
                  key={page}
                  onClick={handleCloseNav}
                  sx={{ my: 2, color: "#252525", display: "block" }}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                >
                  {page}
                </StyledButton>
              ))}
            </Box>
            {/* Icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "25px",
              }}
            >
              <Box>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={100} color="error" max={99}>
                    <ShoppingCart fontSize="medium" />
                  </StyledBadge>
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open account menu">
                  <IconButton
                    size="large"
                    aria-label="account-bar"
                    aria-controls="account-bar"
                    aria-haspopup="true"
                    onClick={handleOpenUser}
                    sx={{ p: 0 }}
                  >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="account-bar"
                  anchorEl={anchorUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorUser)}
                  onClose={handleCloseUser}
                >
                  <MenuItem
                    onClick={handleCloseUser}
                    sx={{ flexDirection: "column" }}
                  >
                    <StyledButton href="/login">Login</StyledButton>
                    <StyledButton href="/register">Register</StyledButton>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

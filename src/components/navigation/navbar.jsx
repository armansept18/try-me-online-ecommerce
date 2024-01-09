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
  Slide,
  Toolbar,
  Tooltip,
  useScrollTrigger,
} from "@mui/material";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../public/images/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoutModal } from "../modal/logout";
import { CartModal } from "../modal/cart";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

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
const accountLoggedIn = ["Account", "Order", "Address"];

export const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const handleOpenNav = (event) => setAnchorNav(event.currentTarget);
  const handleCloseNav = () => setAnchorNav(null);
  const handleOpenUser = (event) => setAnchorUser(event.currentTarget);
  const handleCloseUser = () => setAnchorUser(null);

  const handleLogout = () => {
    setOpenLogoutModal(true);
  };

  const updateCart = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(updatedCart);
    const newTotalQuantity = updatedCart.reduce(
      (total, item) => total + item.qty,
      0
    );
    setTotalQuantity(newTotalQuantity);
  };
  const handleCartClicked = () => {
    setOpenCartModal(true);
    updateCart();
  };
  useEffect(() => {
    updateCart();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <CartModal open={openCartModal} onClose={() => setOpenCartModal(false)} />
      <HideOnScroll>
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
                    <MenuItem key={page} onClick={handleCloseNav}>
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
              <LogoutModal
                open={openLogoutModal}
                onClose={() => setOpenLogoutModal(false)}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <Box>
                  <IconButton aria-label="cart" onClick={handleCartClicked}>
                    <StyledBadge
                      badgeContent={totalQuantity || "0"}
                      color="error"
                      max={99}
                    >
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
                      {isLoggedIn ? (
                        <AccountCircle fontSize="large" />
                      ) : (
                        <StyledButton
                          component={Link}
                          to="/login"
                          sx={{ my: 2, color: "#252525", display: "block" }}
                        >
                          Login
                        </StyledButton>
                      )}
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
                    {isLoggedIn ? (
                      accountLoggedIn.map((item) => (
                        <MenuItem key={item} onClick={handleCloseUser}>
                          <StyledButton
                            component={Link}
                            to={`/${item.toLowerCase()}`}
                          >
                            {item}
                          </StyledButton>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem onClick={handleCloseUser}>
                        <StyledButton component={Link} to="/login">
                          Login
                        </StyledButton>
                      </MenuItem>
                    )}
                    {isLoggedIn && (
                      <MenuItem onClick={handleLogout}>
                        <StyledButton>Logout</StyledButton>
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

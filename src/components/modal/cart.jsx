import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { CartList } from "../card/cart-list";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartModal = ({ open, onClose }) => {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("auth");
    if (!token) {
      alert("Please login!");
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      setTimeout(() => {
        nav("/account");
      }, 1000);
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(cartItems);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>Product List</Typography>
        </Box>
        <CartList products={products} setProducts={setProducts} />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            fontFamily: "Quicksand",
            fontWeight: "700",
            color: "#252525",
          }}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Quicksand",
            fontWeight: "700",
            background: "#F6e6cd",
            color: "#252525",
            "&:hover": {
              backgroundColor: "#f5d194",
            },
          }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

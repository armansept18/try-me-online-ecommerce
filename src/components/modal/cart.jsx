// Add to card product
// Sub total
// List of product
// pic, name, price, add qty
// button checkout

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

export const CartModal = ({ open, onClose }) => {
  const [products, setProducts] = useState([]);

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
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

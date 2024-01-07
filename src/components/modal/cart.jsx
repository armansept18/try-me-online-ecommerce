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
import { CartEmptyAlert, NeedLoginAlert } from "../alert/alert";

export const CartModal = ({ open, onClose }) => {
  const [products, setProducts] = useState([]);
  const [needLoginAlert, setNeedLoginAlert] = useState(false);
  const [cartEmptyAlert, setCartEmptyAlert] = useState(false);
  const nav = useNavigate();

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("auth");
    if (!token) {
      setTimeout(() => {
        setNeedLoginAlert(true);
      }, 2000);
    }

    if (cart.length === 0) {
      setCartEmptyAlert(true);
    } else {
      setTimeout(() => {
        nav("/address-select");
      }, 1000);
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(cartItems);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <NeedLoginAlert
        onOpen={needLoginAlert}
        onClose={() => setNeedLoginAlert(false)}
      />
      <CartEmptyAlert
        onOpen={cartEmptyAlert}
        onClose={() => setCartEmptyAlert(false)}
      />
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

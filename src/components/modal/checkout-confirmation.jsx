import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { InvoiceModal } from "./invoice";
import { FailedCheckout, SuccessCheckout } from "../alert/alert";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

export const CheckoutConfirmation = ({ onOpen, onClose, selectedAddress }) => {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(11500);
  const [orderId, setOrderId] = useState(null);
  const [invoiceDialog, setInvoiceDialog] = useState(false);
  const [checkoutAlert, setCheckoutAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutFailedAlert, setCheckoutFailedAlert] = useState(false);

  const fetchCart = () => {
    try {
      const cart = localStorage.getItem("cart");
      setCart(JSON.parse(cart));
    } catch (err) {
      console.error("Error fetch cart :", err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("auth");
      const cartData = JSON.parse(localStorage.getItem("cart"));

      console.log("cartData isinya :", cartData);

      if (!cartData || cartData.length === 0) {
        return setCheckoutFailedAlert(true);
      }

      const response = await api.post(
        "/api/orders",
        {
          delivery_fee: deliveryFee,
          delivery_address: selectedAddress._id,
          cart: cartData,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log("Response API checkout", response.data);
      if (response.status === 201) {
        const order = response.data.order;
        console.log("After Response order:", order);
        setOrderId(order._id);
        setLoading(true);
        setCheckoutAlert(true);
        setTimeout(() => {
          setInvoiceDialog(true);
          localStorage.removeItem("cart");
        }, 3000);
      } else {
        setCheckoutFailedAlert(true);
      }
      // setTimeout(() => {
      //   nav("/account");
      // }, 10000);
    } catch (err) {
      console.error("Error during checkout:", err);
      setCheckoutFailedAlert(true);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, product) => {
      return acc + product.price * product.qty;
    }, 0);

    const grandTotal = totalPrice + deliveryFee;

    setTotal(grandTotal);
  }, [cart, deliveryFee]);
  return (
    <Dialog open={onOpen} onClose={onClose} fullWidth>
      <InvoiceModal onOpen={invoiceDialog} orderId={orderId} />
      <SuccessCheckout
        onOpen={checkoutAlert}
        onClose={() => setCheckoutAlert(false)}
      />
      <FailedCheckout
        onOpen={checkoutFailedAlert}
        onClose={() => setCheckoutFailedAlert(false)}
      />
      <DialogTitle fontFamily="Quicksand" fontWeight="800">
        Checkout Confirmation
      </DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Typography fontFamily="Quicksand" fontWeight="700">
            Selected Delivery Address
          </Typography>
          {selectedAddress ? (
            <Typography
              mt={2}
              textAlign="right"
              fontFamily="Quicksand"
            >{`${selectedAddress.nama}, ${selectedAddress.detail}, ${selectedAddress.kelurahan}, ${selectedAddress.kecamatan}, ${selectedAddress.kota}, ${selectedAddress.provinsi}`}</Typography>
          ) : (
            <Typography fontFamily="Quicksand">No address selected</Typography>
          )}
        </Box>
        <Box mt={4}>
          <Typography mt={2} fontFamily="Quicksand" fontWeight="700">
            Cart
          </Typography>
          {cart.map((product) => (
            <Card
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              key={product._id}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <img
                  src={`http://localhost:5000/static/${product.image_url}`}
                  alt="Product Image"
                  style={{
                    width: "50px",
                    height: "40px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
                <Typography variant="subtitle1" fontFamily="Quicksand">
                  {product.name} x {product.qty} pcs
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="body2"
                  fontFamily="Quicksand"
                  fontWeight="600"
                >
                  IDR &nbsp;
                  {(product.price * product.qty).toLocaleString("id-ID")}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
        <Box mt={4}>
          <Typography fontFamily="Quicksand" fontWeight="700">
            Delivery Fee
          </Typography>
          <Typography fontFamily="Quicksand" fontWeight="600" textAlign="right">
            IDR {deliveryFee.toLocaleString("id-ID")}
          </Typography>
        </Box>
        <Box mt={4}>
          <Divider />
          <Typography
            mt={2}
            textAlign="right"
            fontFamily="Quicksand"
            fontWeight="600"
          >
            Grand Total : IDR {total.toLocaleString("id-ID")}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ margin: "10px" }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "Quicksand",
            color: "#252525",
          }}
        >
          Back
        </Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          sx={{
            backgroundColor: "#F6E6CD",
            color: "#252525",
            fontFamily: "Quicksand",
            fontWeight: "700",
            "&:hover": {
              backgroundColor: "#FFC193",
            },
          }}
          onClick={handleCheckout}
        >
          Checkout
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

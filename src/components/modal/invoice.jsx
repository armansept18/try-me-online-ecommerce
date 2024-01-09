import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import Logo from "../../public/images/logo.png";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { SuccessPrint } from "../alert/alert";
import { api } from "../../api/axios";

export const InvoiceModal = ({ onOpen, onClose, orderId }) => {
  const nav = useNavigate();
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [printAlert, setPrintAlert] = useState(false);

  const fetchInvoiceData = async () => {
    try {
      if (!orderId) {
        return;
      }

      const token = localStorage.getItem("auth");
      const response = await api.get(`/api/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setInvoiceData(response.data);
    } catch (err) {
      console.error("Error fetch invoice :", err.message);
    }
  };

  useEffect(() => {
    if (onOpen) {
      fetchInvoiceData();
    }
  }, [onOpen, orderId]);

  const handlePrint = () => {
    setPrintAlert(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.print();
      nav("/account");
    }, 3000);
  };

  const totalAmount = invoiceData.order
    ? invoiceData.order.cart.reduce(
        (acc, product) => acc + product.price * product.qty,
        0
      ) + invoiceData.order.delivery_fee
    : 0;

  return (
    <Dialog open={onOpen} onClose={onClose} fullWidth>
      <SuccessPrint onOpen={printAlert} onClose={() => setPrintAlert(false)} />
      <DialogTitle
        fontFamily="Quicksand"
        fontWeight="700"
        display="flex"
        justifyContent="center"
      >
        Invoice
      </DialogTitle>

      <DialogContent>
        <Typography fontFamily="Quicksand">
          {new Date(invoiceData.order?.createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Typography fontFamily="Quicksand">Order ID :</Typography>
          <Typography fontFamily="Quicksand">
            INV-00{invoiceData.order?._id}A
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontFamily="Quicksand">Status :</Typography>
          <Typography fontFamily="Quicksand">
            {invoiceData.order?.status}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontFamily="Quicksand">Product :</Typography>
          <Box>
            {invoiceData.order?.cart.map((product) => (
              <Typography
                key={product._id}
                fontFamily="Quicksand"
                textAlign="right"
              >
                {product.name} - {product.qty} pcs @ IDR{" "}
                {product.price.toLocaleString("id-ID")}
              </Typography>
            ))}
          </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontFamily="Quicksand">Delivery Fee :</Typography>
          <Typography fontFamily="Quicksand">
            IDR {invoiceData.order?.delivery_fee.toLocaleString("id-ID")}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontFamily="Quicksand">Total Amount :</Typography>
          <Typography fontFamily="Quicksand">
            IDR {totalAmount.toLocaleString("id-ID")}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontFamily="Quicksand">Billed To :</Typography>
          <Box>
            <Typography fontFamily="Quicksand">
              {invoiceData.order?.user && (
                <>
                  <Typography fontFamily="Quicksand" textAlign="right">
                    {invoiceData.order.user.full_name}
                  </Typography>
                  <Typography fontFamily="Quicksand" textAlign="right">
                    {invoiceData.order.delivery_address.detail}
                  </Typography>
                  <Typography fontFamily="Quicksand" textAlign="right">
                    {invoiceData.order.delivery_address.kelurahan},
                    {invoiceData.order.delivery_address.kecamatan},
                  </Typography>
                  <Typography fontFamily="Quicksand" textAlign="right">
                    {invoiceData.order.delivery_address.kota}
                    {invoiceData.order.delivery_address.provinsi}
                  </Typography>
                </>
              )}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography fontFamily="Quicksand">Payment To :</Typography>
          <Box>
            <Typography fontFamily="Quicksand" textAlign="right">
              Try Me Online Shop
            </Typography>
            <Typography fontFamily="Quicksand" textAlign="right">
              shop@try.me
            </Typography>
            <Typography fontFamily="Quicksand" textAlign="right">
              XYZ Bank
            </Typography>
            <Typography fontFamily="Quicksand" textAlign="right">
              xxxx-xxxx-xxxx-0000
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box mt={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src={Logo} alt="Logo" width="100px" />
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography fontFamily="Quicksand">Thank You!</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
        <LoadingButton
          variant="contained"
          loading={loading}
          sx={{
            fontFamily: "Quicksand",
            backgroundColor: "#F6E6CD",
            color: "#252525",
            "&:hover": {
              backgroundColor: "#FFD798",
            },
          }}
          onClick={handlePrint}
        >
          Print&nbsp;
          <PrintIcon />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

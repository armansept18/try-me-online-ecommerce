import {
  Box,
  Button,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InvoiceModal } from "../../components/modal/invoice";
import {
  AddressNotSelected,
  SuccessCheckout,
} from "../../components/alert/alert";
import { CheckoutConfirmation } from "../../components/modal/checkout-confirmation";

export const AddressSelectionPage = () => {
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [successCheckoutAlert, setSuccessCheckoutAlert] = useState(false);
  const [addressSelectAlert, setAddressSelectAlert] = useState(false);

  const fetchUserAddress = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await api.get("/api/delivery-addresses", {
        headers: { authorization: `Bearer ${token}` },
      });
      setAddress(response.data.data);
    } catch (err) {
      console.error("Fetch address when checkout error:", err);
    }
  };
  const handleAddressSelection = (selectedAddress) => {
    console.log("Address select :", selectedAddress);
    setSelectedAddress(selectedAddress);
  };

  const handleCancel = () => {
    nav("/products");
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      setAddressSelectAlert(true);
    } else {
      setConfirmationModal(true);
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  return (
    <Paper maxWidth="1368px" sx={{ margin: "80px 20px", height: "100vh" }}>
      <SuccessCheckout
        onOpen={successCheckoutAlert}
        onClose={() => setSuccessCheckoutAlert(false)}
      />
      <AddressNotSelected
        onOpen={addressSelectAlert}
        onClose={() => setAddressSelectAlert(false)}
      />
      <CheckoutConfirmation
        onOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        selectedAddress={selectedAddress}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ padding: "20px", alignSelf: "flex-start" }}>
          <Typography
            fontSize="16px"
            fontFamily="Quicksand"
            fontWeight="500"
            mb={2}
          >
            Hello, {userSelector.user ? userSelector.user.full_name : "Guest"}
          </Typography>
          <Typography fontSize="24px" fontFamily="Quicksand" fontWeight="700">
            Select Delivery Address
          </Typography>
        </Box>
        <Box width="100%">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {address.map((addr) => (
                  <TableRow
                    key={addr.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => handleAddressSelection(addr)}
                  >
                    <TableCell component="th" scope="row">
                      <Radio
                        size="small"
                        checked={selectedAddress === addr}
                        onClick={() => handleAddressSelection(addr)}
                      />
                    </TableCell>
                    <TableCell>{addr.nama}</TableCell>
                    <TableCell align="right">
                      {addr.detail}, {addr.kelurahan}, {addr.kecamatan},{" "}
                      {addr.kota}, {addr.provinsi}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box m="40px 20px" display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          sx={{ fontFamily: "Quicksand", color: "#252525", fontWeight: "600" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontFamily: "Quicksand", fontWeight: "600" }}
          onClick={handleCheckout}
        >
          Confirm
        </Button>
      </Box>
    </Paper>
  );
};

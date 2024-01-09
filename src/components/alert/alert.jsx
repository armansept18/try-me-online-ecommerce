import { Alert, AlertTitle, Box, Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}
export const SuccessPrint = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Success! - Please check your order.</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};
export const SuccessCheckout = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Thank you! - Your order has been process</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const SuccessAddProduct = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Product Created!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};
export const SuccessDeleteProduct = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Product Deleted!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};
export const SuccessAddCategory = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Category Created!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const SuccessAddToCart = ({ onOpen, onClose }) => {
  return (
    <SnackbarProvider
      open={onOpen}
      onClose={onClose}
      autoHideDuration={2000}
      maxSnack={3}
    ></SnackbarProvider>
  );
};

export const NeedLoginAlert = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="warning">
        <AlertTitle>Authentication Failed! - Please login first.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export const RegisterSuccessAlert = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Register Success! - Please login.</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};
export const FailedRegisterAlert = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={onOpen}
        onClose={onClose}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="error">
          <AlertTitle>Failed! - Email has been registered.</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const LoginSuccessAlert = ({ openLogin, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openLogin}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          <AlertTitle>Login Success!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const FailedLoginAlert = ({ openFailed, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openFailed}
        onClose={onClose}
        key={(vertical, horizontal)}
        autoHideDuration={2000}
      >
        <Alert severity="warning">
          <AlertTitle>Wrong Email or Password!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const CartEmptyAlert = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>Cart Empty! - Start find your product</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export const UpdateAddressSuccess = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="success">
        <AlertTitle>Address Updated!</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
export const CreateAddressSuccess = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="success">
        <AlertTitle>Address Created!</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
export const DeleteAddressSuccess = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="success">
        <AlertTitle>Address Deleted!</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
export const CreateAddressFailed = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>Failed! - Check connection.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
export const CreateAddressEmptyField = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="warning">
        <AlertTitle>Please fill the fields.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export const DeleteAccount = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>Sorry! - Can't Delete Account.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export const AddressNotSelected = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>Failed! - Please select your delivery address.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export const SessionExpired = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>Session Expired! - Please login again.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
export const FailedCheckout = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>Checkout Error! - Please check connection.</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
export const ErrorCartEmpty = ({ onOpen, onClose }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={onOpen}
      onClose={onClose}
      key={(vertical, horizontal)}
      autoHideDuration={2000}
    >
      <Alert severity="error">
        <AlertTitle>
          Error! - Your cart is empty. <br />
          &nbsp; &nbsp; &nbsp; &nbsp; Redirecting...
        </AlertTitle>
      </Alert>
    </Snackbar>
  );
};

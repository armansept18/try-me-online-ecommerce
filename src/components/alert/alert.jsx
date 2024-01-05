import { Alert, AlertTitle, Box, Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export const SuccessAddProduct = ({}) => {
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });
  return (
    <Snackbar autoHideDuration={2000} TransitionComponent={SlideTransition}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Product has been added successfully!
      </Alert>
    </Snackbar>
  );
};
export const FailedAddProduct = ({}) => {
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });
  return (
    <Snackbar autoHideDuration={2000} TransitionComponent={SlideTransition}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Failed Add Product!
      </Alert>
    </Snackbar>
  );
};

export const NeedLoginAlert = () => {
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
        open={open}
        key={(vertical, horizontal)}
      >
        <Alert severity="warning">
          <AlertTitle>Need Login!</AlertTitle>
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

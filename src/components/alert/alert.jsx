import { Alert, AlertTitle, Box, Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export const SuccessAddProduct = () => {
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });
  return (
    <Snackbar autoHideDuration={3000} TransitionComponent={SlideTransition}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Product has been added successfully!
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

export const LoginSuccessAlert = ({ open, onClose }) => {
  return (
    <Box>
      <Snackbar
        open={open}
        onClose={onClose}
        autoHideDuration={3000}
        TransitionComponent={SlideTransition}
      >
        <Alert severity="success">
          <AlertTitle>Logged in Successfully!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const FailedLoginAlert = () => {
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
          <AlertTitle>Wrong Email or Password!</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
};

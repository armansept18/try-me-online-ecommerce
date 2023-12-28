import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LogoutModal = ({ open, onClose }) => {
  const theme = useTheme();
  const nav = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    onClose();
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    onClose();
    nav("/home");
    window.location.reload();
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Are You Sure Want To Logged Out ?
      </DialogTitle>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          autoFocus
          onClick={handleClose}
          variant="contained"
          color="success"
        >
          Cancel
        </Button>
        <Button
          onClick={handleLogout}
          autoFocus
          variant="contained"
          sx={{ backgroundColor: "#DE3D32" }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

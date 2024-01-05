import { useTheme } from "@mui/material/styles";
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
    localStorage.removeItem("cart");
    onClose();
    window.location.reload();
    nav("/home");
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogTitle
        id="responsive-dialog-title"
        alignSelf="center"
        fontFamily="Quicksand"
        fontWeight="700"
      >
        You forgot something!
      </DialogTitle>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Button
          autoFocus
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "#252525",
            fontFamily: "Quicksand",
            fontWeight: 700,
            border: "1px solid #F6E6CD",
            "&:hover": {
              border: "1px solid #F6E6CD",
              backgroundColor: "#F6E6CD",
            },
          }}
        >
          Keep Searching
        </Button>
        <Button
          onClick={handleLogout}
          autoFocus
          variant="outlined"
          color="error"
          sx={{
            color: "#252525",
            fontFamily: "Quicksand",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#F22222",
              color: "#f5f5f5",
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

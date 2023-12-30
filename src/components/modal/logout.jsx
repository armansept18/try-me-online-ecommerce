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
      <DialogTitle id="responsive-dialog-title" alignSelf="center">
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
          variant="contained"
          color="success"
        >
          Keep Searching
        </Button>
        <Button
          onClick={handleLogout}
          autoFocus
          variant="contained"
          sx={{
            backgroundColor: "#DE3D32",
            "&:hover": {
              backgroundColor: "#c91b10",
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

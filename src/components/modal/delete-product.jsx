import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

export const DeleteProductModal = ({ open, onClose, productId }) => {
  const theme = useTheme();
  const nav = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    try {
      console.log("handle delete product id :", productId);
      const productIdString = String(productId);
      console.log("product id string :", productIdString);
      const token = localStorage.getItem("auth");
      const response = await api.delete(`/api/products/${productIdString}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("handle delete :", response);
      alert("Product Deleted!");

      nav("/products");
    } catch (err) {
      console.error("Error deleting product : ", err);
    }
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
        Are you sure?
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
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

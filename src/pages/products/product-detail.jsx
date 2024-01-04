import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Navbar } from "../../components/navigation/navbar";
import { Footer } from "../../components/footer/footer";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
import { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector } from "react-redux";
import { DeleteProductModal } from "../../components/modal/delete-product";

export const ProductDetail = () => {
  const nav = useNavigate();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const userRole = useSelector((state) => state.auth.user?.role);

  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`/api/products/${productId}`);
      setProductDetails(response.data.product);
    } catch (err) {
      console.log("Error fetching event details :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {};

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Navbar />
      <DeleteProductModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        productId={productId}
      />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "112px 20px",
          background: "#f5f5f5",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "80px",
          }}
        >
          <img
            src={`http://localhost:5000/static/${productDetails.image_url}`}
            alt="Product Detail"
            style={{
              borderRadius: "10px",
              boxShadow: "8px 12px 20px -2px rgba(0,0,0, 2)",
              maxHeight: "568px",
              height: "auto",
              maxWidth: "360px",
              width: "100%",
              aspectRatio: 1,
              objectFit: "fill",
            }}
          />
          <Box maxWidth="616px">
            <Typography fontFamily="Quicksand" fontSize="40px" fontWeight="700">
              {productDetails.name || "Product Name"}
            </Typography>
            <Typography
              marginTop="8px"
              fontFamily="Quicksand"
              fontSize="24px"
              fontWeight="700"
            >
              IDR {Number(productDetails.price).toLocaleString("id-ID")}
            </Typography>
            <Typography
              fontFamily="Quicksand"
              fontSize="16px"
              fontWeight="500"
              marginTop="24px"
            >
              {productDetails.description ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptateaut perspiciatis beatae non eum! Veritatis dicta ad, obcaecati accusantium, aperiam illo debitis, eius sed sequi temporibus praesentium sit illum atque!"}
            </Typography>
            {userRole === "admin" && (
              <Box display="flex" justifyContent="end" gap={2}>
                <SettingsOutlinedIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      transition: "transform  2s",
                      transform: "rotate(360deg)",
                    },
                  }}
                />
                <DeleteOutlineOutlinedIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      transition: "transform 0.5s",
                      transform: "rotate(20deg)",
                    },
                  }}
                  onClick={() => handleDelete()}
                />
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: "160px",
                color: "#252525",
                fontFamily: "Quicksand",
                fontWeight: "700",
                borderRadius: "100px",
                background: "#F6E6CD",
                boxShadow: "0px 24px 48px 0px rgba(0, 0, 0, 0.18)",
                "&:hover": {
                  backgroundColor: "#F37725",
                  color: "#F5F5F5",
                },
              }}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Paper>
      <Footer />
    </>
  );
};

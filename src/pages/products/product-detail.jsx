import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Navbar } from "../../components/navigation/navbar";
import { Footer } from "../../components/footer/footer";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios";
import { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector } from "react-redux";
import { DeleteProductModal } from "../../components/modal/delete-product";
import { ProductModal } from "../../components/modal/product";
import { SuccessAddToCart } from "../../components/alert/alert";
import { enqueueSnackbar } from "notistack";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [alertAddToCart, setAlertAddToCart] = useState(false);
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

  const handleUpdate = () => {
    setOpenProductModal(true);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleAddToCart = (variant) => () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find(
      (item) => item._id === productDetails._id
    );

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      existingCart.push({ ...productDetails, qty: 1 });
    }

    enqueueSnackbar("Product has been added to cart!", { variant });

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setAlertAddToCart(true);
    setOpenCartModal(true);
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
      <ProductModal
        isOpen={openProductModal}
        onClose={() => setOpenProductModal(false)}
        edit={productDetails}
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
                  onClick={() => handleUpdate()}
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
              onClick={handleAddToCart("success")}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Paper>
      <SuccessAddToCart
        onOpen={alertAddToCart}
        onClose={() => setAlertAddToCart(false)}
      />
      <Footer />
    </>
  );
};

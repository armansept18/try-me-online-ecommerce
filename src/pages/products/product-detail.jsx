import { Box, Button, Paper, Typography } from "@mui/material";
import Product from "../../public/images/products/cosmetic.jpeg";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

export const ProductDetail = ({ product }) => {
  //   const { image, name, category, tags, price, description } = product;
  return (
    <>
      <Navbar />
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
            gap: "80px",
          }}
        >
          <img
            src={Product}
            alt="Product Detail"
            style={{
              borderRadius: "10px",
              maxHeight: "568px",
              height: "100vh",
              maxWidth: "498px",
              width: "100vw",
              aspectRatio: 1,
              objectFit: "fill",
            }}
          />
          <Box maxWidth="616px">
            <Typography fontFamily="Quicksand" fontSize="40px" fontWeight="700">
              {"Product name"}
            </Typography>
            <Typography
              marginTop="8px"
              fontFamily="Quicksand"
              fontSize="24px"
              fontWeight="700"
            >
              IDR {25000}
            </Typography>
            <Typography
              fontFamily="Quicksand"
              fontSize="16px"
              fontWeight="500"
              marginTop="24px"
            >
              {
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptateaut perspiciatis beatae non eum! Veritatis dicta ad, obcaecati accusantium, aperiam illo debitis, eius sed sequi temporibus praesentium sit illum atque!"
              }
            </Typography>
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

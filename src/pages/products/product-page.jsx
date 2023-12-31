import { Box, Paper, Typography } from "@mui/material";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { CategoryList } from "../../components/products/category-list";
import { SearchBar } from "../../components/search/search-bar";
import { ProductList } from "../../components/products/products-list";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data.data);
    } catch (err) {
      console.log("Error fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Navbar />
      <Paper elevation={0} sx={{ background: "transparent" }}>
        <Box
          margin="112px 20px"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            marginBottom="80px"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontFamily="Quicksand" fontSize="16px">
              PRODUCTS
            </Typography>
            <Typography fontFamily="Russo One" fontSize="48px" marginTop="16px">
              Your Products Here
            </Typography>
            <Typography fontFamily="Quicksand" fontSize="16px" marginTop="24px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </Box>
          <SearchBar />
          <ProductList products={[...products]} fetchProduct={fetchProduct} />
        </Box>
      </Paper>
      <Footer />
    </>
  );
};

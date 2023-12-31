import { Box, Grid } from "@mui/material";
import { ProductCard } from "../card/product-card";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await api.get("/api/products");
      console.log("fetch products response: ", response.data);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products :", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: "80px",
      }}
    >
      {products.map((product) => (
        <Grid item key={product.id} xs={8} sm={4} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Box>
  );
};

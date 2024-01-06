import { Box, Button, Paper, Typography } from "@mui/material";
import { ProductList } from "./products-list";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export const TrendingProducts = () => {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/api/products/`, {
        params: {
          page: 2,
          limit: 5,
        },
      });
      setProducts(response.data.data);
      console.log("trending products :", response.data.data);
    } catch (err) {
      console.error("trending products error :", err.message);
    }
  };

  const handleView = () => {
    nav("/products");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Paper elevation={0} sx={{ marginTop: "112px", background: "transparent" }}>
      <Box sx={{ margin: "40px 64px 0 64px" }}>
        <Typography fontSize="16px" fontFamily="Quicksand">
          TRENDING
        </Typography>
        <Typography fontSize="48px" fontWeight="400" fontFamily="Russo One">
          Trending Products
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize="18px" fontFamily="Quicksand">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "100px",
              border: "solid 2px #252525",
              color: "#252525",
              "&:hover": {
                border: "solid 2px #252525",
              },
              fontFamily: "Quicksand",
              fontSize: "16px",
            }}
            onClick={(e) => handleView(e.target.value)}
          >
            View All
          </Button>
        </Box>
      </Box>
      <ProductList products={products} />
    </Paper>
  );
};

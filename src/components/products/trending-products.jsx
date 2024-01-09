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
    <Paper
      className="flex flex-col justify-center items-center"
      elevation={0}
      sx={{ marginTop: "80px", background: "transparent" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth="1368px"
        width="100vw"
      >
        <Box>
          <Typography fontSize="16px" fontFamily="Quicksand">
            TRENDING
          </Typography>
          <Typography fontSize="48px" fontWeight="400" fontFamily="Russo One">
            Trending Products
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="18px" fontFamily="Quicksand">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="flex-end">
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
      {products.length === 0 ? (
        <Typography mt={10} fontFamily="Quicksand" textAlign="center">
          There is no data! <br />
          Please wait several days.
        </Typography>
      ) : (
        <ProductList products={products} />
      )}
    </Paper>
  );
};

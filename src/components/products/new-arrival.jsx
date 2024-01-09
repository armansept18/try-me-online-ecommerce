import { Box, Button, Paper, Typography } from "@mui/material";
import { ProductList } from "./products-list";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { useEffect, useState } from "react";

export const NewArrivalProducts = () => {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products`);
      setProducts(response.data.data);
    } catch (err) {
      console.log("Error fetch new arrival: ", err);
    }
  };

  const handleView = () => {
    nav("/products");
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Paper
      className="flex flex-col justify-center items-center"
      elevation={0}
      sx={{
        marginTop: "80px",
        background: "transparent",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth="1368px"
        width="100vw"
      >
        <Box>
          <Typography fontSize="16px" fontFamily="Quicksand">
            NEW ARRIVALS
          </Typography>
          <Typography fontSize="48px" fontWeight="400" fontFamily="Russo One">
            New Arrival Products
          </Typography>
          <Box>
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

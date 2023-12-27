import { Box, Typography } from "@mui/material";
import Product1 from "../../public/images/products/cosmetic.jpeg";

export const ProductCard = ({ product }) => {
  return (
    <>
      <Box
        mt="80px"
        //   to={`/product-detail/${product._id}`}
      >
        <img
          src={Product1 || `${product.image}`}
          alt="Product"
          style={{
            maxWidth: "304px",
            maxHeight: "304px",
            width: "100vw",
            height: "100vw",
            borderRadius: "10px",
          }}
        />

        <Box mt="16px">
          <Typography fontFamily="Quicksand" fontSize="18px" fontWeight={600}>
            {"Product name" || `${product.name}`}
          </Typography>
          <Typography fontFamily="Quicksand" fontSize="16px" fontWeight={400}>
            {"Category" || `${product.category}`}
          </Typography>
          <Typography fontFamily="Quicksand" fontSize="14px" fontWeight={400}>
            {"Tag" || `${product.tags}`}
          </Typography>
          <Typography
            fontFamily="Quicksand"
            fontSize="20px"
            fontWeight={700}
            mt="8px"
          >
            IDR {"75.000" || `${product.price}`}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

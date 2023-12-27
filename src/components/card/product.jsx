import { Box, ImageList, Typography } from "@mui/material";
import Product1 from "../../public/images/products/cosmetic.jpeg";

export const ProductCard = () => {
  return (
    <Box mt="80px">
      <ImageList>
        <img
          src={Product1}
          alt="Product"
          style={{
            maxWidth: "304px",
            maxHeight: "304px",
            width: "100vw",
            height: "100vw",
            borderRadius: "10px",
          }}
        />
      </ImageList>
      <Box mt="16px">
        <Typography fontFamily="Quicksand" fontSize="18px" fontWeight={600}>
          {"Product name"}
        </Typography>
        <Typography fontFamily="Quicksand" fontSize="16px" fontWeight={400}>
          {"Category"}
        </Typography>
        <Typography fontFamily="Quicksand" fontSize="14px" fontWeight={400}>
          {"Tag"}
        </Typography>
        <Typography
          fontFamily="Quicksand"
          fontSize="20px"
          fontWeight={700}
          mt="8px"
        >
          IDR {"16.000"}
        </Typography>
      </Box>
    </Box>
  );
};

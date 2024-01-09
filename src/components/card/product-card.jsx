import { Box, CardActionArea, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  if (!product) {
    return (
      <div className="flex justify-center items-center">
        No Product Here! Please wait a several days.
      </div>
    );
  }
  const { image_url, name, category, tags, price } = product;

  return (
    <Link to={`/product-detail/${product._id}`}>
      <CardActionArea mt="80px" sx={{ borderRadius: "10px" }}>
        <Box p="12px">
          <img
            src={`http://localhost:5000/static/${image_url}`}
            alt={name}
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              width: "100vw",
              height: "100vw",
              borderRadius: "10px",
            }}
          />

          <Box mt="16px">
            <Typography fontFamily="Quicksand" fontSize="18px" fontWeight={600}>
              {`${name}` || "Product Title"}
            </Typography>
            <Typography fontFamily="Quicksand" fontSize="16px" fontWeight={400}>
              {`${category.name}` || "Category #"}
            </Typography>
            <Typography fontFamily="Quicksand" fontSize="14px" fontWeight={400}>
              {`${tags.map((tag) => tag.name).join(", ")}` || "no tags"}
            </Typography>
            <Typography
              fontFamily="Quicksand"
              fontSize="20px"
              fontWeight={700}
              mt="8px"
            >
              IDR {`${price.toLocaleString("id-ID")}` || 9999}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Link>
  );
};

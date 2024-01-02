import { Box, Grid } from "@mui/material";
import { ProductCard } from "../card/product-card";

export const ProductList = ({ products }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "1368px",
        width: "100%",
        margin: "80px 40px",
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

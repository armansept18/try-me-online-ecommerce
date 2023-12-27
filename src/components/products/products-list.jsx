import { Box, Grid } from "@mui/material";
import { ProductCard } from "../card/product-card";
import Product1 from "../../public/images/products/cosmetic.jpeg";

const data = [
  {
    id: 1,
    image: Product1,
    name: "Product 1",
    category: "Category A",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    price: 50000,
  },
  {
    id: 2,
    image: Product1,
    name: "Product 2",
    category: "Category A",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    price: 45000,
  },
  {
    id: 3,
    image: Product1,
    name: "Product 3",
    category: "Category A",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    price: 16000,
  },
  {
    id: 4,
    image: Product1,
    name: "Product 4",
    category: "Category A",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    price: 19000,
  },
];

export const ProductList = () => {
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
      {data.map((product) => (
        <Grid item key={product.id} xs={8} sm={4} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Box>
  );
};

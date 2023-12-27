import { Box } from "@mui/material";
import { ProductCard } from "../card/product-card";

export const ProductList = ({ products = [], fetchProducts }) => {
  return (
    <Box>
      {products.map((product, idx) => (
        <ProductCard
          key={idx}
          product={product}
          onFetchProducts={fetchProducts?.onFetchProducts}
        />
      ))}
    </Box>
  );
};

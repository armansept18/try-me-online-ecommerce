import { Box, Grid } from "@mui/material";
import { ProductCard } from "../card/product-card";
import { useEffect, useState } from "react";
import { ProductCardSkeleton } from "../card/skeleton/product-skeleton";
import { motion } from "framer-motion";

const visible = { opacity: 1, y: 0, transition: { duration: 2 } };

export const ProductList = ({ products }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <Grid item key={index} xs={8} sm={4} md={3}>
              <ProductCardSkeleton />
            </Grid>
          ))
        : products.map((product) => (
            <Grid item key={product.id} xs={8} sm={4} md={3}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, transition: { duration: 2 } }}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Grid>
          ))}
    </Box>
  );
};

import { Box, Grid, Paper } from "@mui/material";
import Category1 from "../../public/images/products/77b88849a1474795d08d1c5f7b538549.jpeg";
import { CategoryCard } from "../card/category-card";

const data = [
  {
    id: 1,
    name: "Category 1",
    description: "lorem ipsum dolor sit amet",
    image: Category1,
  },
  {
    id: 2,
    name: "Category 2",
    description: "lorem ipsum dolor sit amet",
    image: Category1,
  },
  {
    id: 3,
    name: "Category 3",
    description: "lorem ipsum dolor sit amet",
    image: Category1,
  },
  {
    id: 4,
    name: "Category 4",
    description: "lorem ipsum dolor sit amet",
    image: Category1,
  },
  {
    id: 5,
    name: "Category 5",
    description: "lorem ipsum dolor sit amet",
    image: Category1,
  },
];

export const CategoryList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      elevation={0}
    >
      {data.map((category) => (
        <Grid item key={category.id} xs={8} sm={4} md={3}>
          <CategoryCard category={category} />
        </Grid>
      ))}
    </Box>
  );
};

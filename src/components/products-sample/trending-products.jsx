import { Box, Button, Paper, Typography } from "@mui/material";
import { ProductCard } from "../card/product";

export const TrendingProducts = () => {
  return (
    <Paper elevation={0} sx={{ marginTop: "112px" }}>
      <Box sx={{ margin: "40px 64px 0 64px" }}>
        <Typography fontSize="16px" fontFamily="Quicksand">
          TRENDING
        </Typography>
        <Typography fontSize="48px" fontWeight="400" fontFamily="Russo One">
          Trending Products
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize="18px" fontFamily="Quicksand">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
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
          >
            View All
          </Button>
        </Box>
      </Box>
      <ProductCard />
    </Paper>
  );
};

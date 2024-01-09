import { Box, CardActionArea, Skeleton } from "@mui/material";

export const ProductCardSkeleton = () => {
  return (
    <>
      <CardActionArea mt="80px" sx={{ borderRadius: "10px" }}>
        <Box p="12px">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="200px"
            height="200px"
            sx={{ borderRadius: "10px" }}
          />
          <Box mt="16px">
            {/* name */}
            <Skeleton animation="wave" sx={{ padding: "4px" }} />
            {/* category */}
            <Skeleton animation="wave" sx={{ padding: "2px" }} />
            {/* Tags */}
            <Skeleton animation="wave" />
            {/* Price */}
            <Skeleton animation="wave" sx={{ padding: "4px" }} />
          </Box>
        </Box>
      </CardActionArea>
    </>
  );
};

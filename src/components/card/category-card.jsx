import { Box, Button, Paper, Typography } from "@mui/material";

export const CategoryCard = ({ category }) => {
  const { name, description, image } = category;
  return (
    <Paper
      sx={{
        maxWidth: "268px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      elevation={10}
    >
      <Box maxWidth="230px" width="100vw" margin="24px">
        <Box gap="8px">
          <Typography fontFamily="Quicksand" fontSize="16px">
            {`${name}` || "Main Category"}
          </Typography>
          <Typography fontFamily="Russo One" fontSize="24px">
            {`${name}` || "Main Category"}
          </Typography>
          <Typography fontFamily="Quicksand" fontSize="16px">
            {`${description}` || "lorem ipsum dolor sit amet"}
          </Typography>
        </Box>
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
            marginTop: "24px",
          }}
        >
          See All
        </Button>
      </Box>
      <img
        src={image}
        alt=""
        style={{
          width: "100vw",
          height: "171px",
          objectFit: "fill",
          borderRadius: "4px",
        }}
      />
    </Paper>
  );
};

import { Box, Button, Typography } from "@mui/material";
import HeroImage from "../../public/images/hero-image.png";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const nav = useNavigate();

  const handleLooking = () => {
    nav("/products");
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column-reverse", md: "row" }}
      justifyContent="space-between"
      sx={{ backgroundColor: "#F6E6CD" }}
    >
      <Box
        margin={{ xs: "80px 0 0 20px", md: "120px 0 0 80px" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography fontFamily="Russo One" fontSize={{ xs: 24, md: 32 }}>
          Try Me Online Ecommerce
        </Typography>
        <Typography
          fontFamily="Quicksand"
          maxWidth={{ xs: "300px", md: "600px" }}
          width="100vw"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
          vero accusantium, quam atque nisi asperiores ut unde id dolorem nam
          quos! Eveniet commodi, enim quidem voluptate hic et saepe asperiores?
        </Typography>
        <Button
          onClick={(e) => handleLooking(e.target.value)}
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            maxWidth: "150px",
            height: "40px",
            width: "100vw",
            borderRadius: "20px",
            fontSize: "12px",
            fontFamily: "Quicksand",
            background:
              "linear-gradient(265deg, #F47726 2.91%, #FFB483 98.68%)",
          }}
        >
          Start Looking
        </Button>
      </Box>
      <img
        src={HeroImage}
        alt="Hero Image"
        style={{
          maxWidth: "100%",
          margin: "80px 0 0 0",
          maxHeight: "700px",
        }}
      />
    </Box>
  );
};

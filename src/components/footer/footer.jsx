import { styled } from "@mui/material/styles";
import { Box, Button, Divider, Typography } from "@mui/material";
import Logo from "../../public/images/logo.png";
import { motion } from "framer-motion";

const visible = { opacity: 1, y: 0, transition: { duration: 3 } };

const StyledNavButton = styled(Button)({
  fontFamily: "Quicksand",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "0.56px",
  color: "#252525",
});

export const Footer = () => {
  return (
    <Box sx={{ marginTop: 20 }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.9 } } }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.img
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible,
          }}
          src={Logo}
          alt=""
          style={{
            maxWidth: "250px",
            maxHeight: "84px",
            width: "100vw",
            height: "100vh",
          }}
        />
      </motion.div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <StyledNavButton href="/home">Home</StyledNavButton>
        <StyledNavButton href="/products">Products</StyledNavButton>
        <StyledNavButton>About</StyledNavButton>
        <StyledNavButton href="/account">Account</StyledNavButton>
      </Box>
      <Box>
        <Divider variant="middle" sx={{ marginTop: "64px" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Quicksand",
          }}
        >
          2022 Relume. All right reserved.
        </Typography>
      </Box>
    </Box>
  );
};

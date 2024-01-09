import { Box, LinearProgress } from "@mui/material";
import Logo from "../../public/images/logo.png";
import { useEffect, useState } from "react";

export const LoadingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const simulateLoading = () => {
      const interval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setImageLoaded(true);
          }
          return newProgress;
        });
      }, 100);
    };

    simulateLoading();

    return () => clearInterval(simulateLoading);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ color: "#F37725" }}
    >
      <img
        src={Logo}
        alt="Logo"
        style={{
          width: "200px",
          height: "auto",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
      />
      <LinearProgress
        variant="determinate"
        value={loadingProgress}
        color="inherit"
        style={{
          width: "20%",
          marginBottom: "20px",
        }}
      />
    </Box>
  );
};

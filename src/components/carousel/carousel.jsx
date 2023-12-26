import Carousel1 from "../../public/images/carousels/carasun.jpg";
import Carousel2 from "../../public/images/carousels/year-end-sale-shine.webp";
import Carousel3 from "../../public/images/carousels/carasun2.jpg";
import Carousel4 from "../../public/images/carousels/signup-femaledaily.webp";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Box, Button, MobileStepper, useTheme } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const AutoplayCarousels = autoPlay(SwipeableViews);
const imageData = [
  { image: Carousel1 },
  { image: Carousel2 },
  { image: Carousel3 },
  { image: Carousel4 },
];

export const Carousel = () => {
  const theme = useTheme();
  const [activeStep, setActiveSet] = useState(0);
  const maxSteps = imageData.length;

  const handleNext = () => {
    setActiveSet((step) => step + 1);
  };
  const handlePrev = () => {
    setActiveSet((step) => step - 1);
  };
  const handleStepChange = (step) => {
    setActiveSet(step);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6E6CD",
        maxHeight: "560px",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
        }}
        style={{ marginTop: "120px" }}
      >
        <AutoplayCarousels
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {imageData.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 325,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: "20px",
                    aspectRatio: 1,
                    objectFit: "cover",
                  }}
                  src={step.image}
                />
              ) : null}
            </div>
          ))}
        </AutoplayCarousels>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          style={{ backgroundColor: "#F6E6CD" }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handlePrev}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Box>
    </Box>
  );
};

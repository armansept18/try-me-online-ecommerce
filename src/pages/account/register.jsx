import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import RegisterImage from "../../public/images/bg-tower2.jpeg";
import {
  AddReactionRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Footer } from "../../components/footer/footer";

const StyledLoginButton = styled(Button)({
  backgroundColor: "#F6E6CD",
  color: "#252525",
  fontFamily: "Quicksand",
  fontWeight: "700",
  maxWidth: "125px",
  width: "100vw",
  "&:hover": {
    backgroundColor: "#F37725",
    color: "#F5F5F5",
  },
});

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F6E6CD",
          maxHeight: "420px",
          height: "100vh",
        }}
        elevation={0}
      >
        <Card
          sx={{
            maxWidth: 520,
            maxHeight: 720,
            height: "100vh",
            width: "100vw",
            borderRadius: "20px",
            marginTop: 50,
            position: "relative",
          }}
          className="flex flex-col justify-center items-center"
          elevation={20}
        >
          <CardMedia
            component="img"
            style={{ maxHeight: "300px" }}
            image={RegisterImage}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              style={{ fontFamily: "Quicksand", fontWeight: "500" }}
            >
              Create Account
            </Typography>
            <div className="flex flex-col justify-center items-center max-w-md w-screen gap-4 mt-8">
              <TextField sx={{ m: 0, width: "37ch" }} label="Fullname">
                Fullname
              </TextField>
              <TextField sx={{ m: 0, width: "37ch" }} label="Email">
                Email
              </TextField>
              <FormControl sx={{ m: 0, width: "37ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <div className="mt-8 mb-4">
              <StyledLoginButton variant="contained">
                Register&nbsp;&nbsp;
                <AddReactionRounded />
              </StyledLoginButton>
            </div>
            <div>
              <Button
                style={{
                  color: "#F37725",
                  fontFamily: "Quicksand",
                  fontWeight: "400",
                }}
                href="/login"
              >
                Already Have An Account?
              </Button>
            </div>
          </CardContent>
        </Card>
      </Paper>
      <Footer />
    </>
  );
};

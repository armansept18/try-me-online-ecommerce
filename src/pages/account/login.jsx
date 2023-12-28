import * as React from "react";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import LoginImage from "../../public/images/bg-tower.jpeg";
import { Fingerprint, Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Footer } from "../../components/footer/footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userLogin } from "../../middlewares/auth-action";
import { types } from "../../redux/types";
import { jwtDecode } from "jwt-decode";

const visible = { opacity: 1, y: 0, transition: { duration: 1.5 } };

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

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid Email Format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const result = await dispatch(userLogin(values));
        if (result === types.success) {
          nav("/home");
        }
      } catch (err) {
        console.error("Login Failed :", err);
      }
    },
  });
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
        <motion.div
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible,
          }}
        >
          <Card
            sx={{
              maxWidth: 520,
              maxHeight: 640,
              height: "100vh",
              width: "100vw",
              borderRadius: "20px",
              marginTop: 45,
              position: "relative",
            }}
            className="flex flex-col justify-center items-center"
            elevation={20}
          >
            <CardMedia
              component="img"
              style={{ maxHeight: "300px" }}
              image={LoginImage}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 1 } }}
                variants={{
                  hidden: { opacity: 0, y: -100 },
                  visible,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  style={{
                    fontFamily: "Quicksand",
                    fontWeight: "500",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Sign In
                </Typography>
              </motion.div>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col justify-center items-center max-w-md w-screen gap-4 mt-8">
                  <TextField
                    sx={{ width: "37ch" }}
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    required
                  >
                    Email
                  </TextField>
                  <FormControl sx={{ m: 0, width: "37ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" required>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      required
                      label="Password"
                      name="password"
                      value={formik.values.password}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
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
                    />
                  </FormControl>
                </div>
                <motion.div
                  className="mt-8 mb-4 flex justify-center items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <StyledLoginButton variant="contained" type="submit">
                    Login &nbsp;
                    <Fingerprint />
                  </StyledLoginButton>
                </motion.div>
              </form>
              <div>
                <Button
                  style={{
                    color: "#F37725",
                    fontFamily: "Quicksand",
                    fontWeight: "400",
                  }}
                  href="/register"
                >
                  Don't Have An Account?
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Paper>
      <Footer />
    </>
  );
};

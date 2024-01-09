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
import RegisterImage from "../../public/images/bg-tower2.jpeg";
import {
  AddReactionRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Footer } from "../../components/footer/footer";
import { motion } from "framer-motion";
import YupPassword from "yup-password";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api } from "../../api/axios";
import { types } from "../../redux/types";
import {
  FailedRegisterAlert,
  RegisterSuccessAlert,
} from "../../components/alert/alert";

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

export const RegisterPage = () => {
  const [registerSuccessAlert, setRegisterSuccessAlert] = React.useState(false);
  const [registerFailedAlert, setRegisterFailedAlert] = React.useState(false);
  YupPassword(Yup);
  const [showPassword, setShowPassword] = React.useState(false);
  const nav = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string().min(3).required(),
      email: Yup.string().email().required(),
      password: Yup.string().minLowercase(1).minUppercase(1).min(4).required(),
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.post("/auth/register", values);
        console.log("Register Submit :", res);
        if (res.status === 200) {
          setRegisterSuccessAlert(true);
          nav("/login");
        }
        if (res === types.success) nav("/login");
        setRegisterSuccessAlert(true);
      } catch (err) {
        setRegisterFailedAlert(true);
        console.error("Registration Failed :", err);
      }
    },
  });

  return (
    <>
      <RegisterSuccessAlert
        onOpen={registerSuccessAlert}
        onClose={() => setRegisterSuccessAlert(false)}
      />
      <FailedRegisterAlert
        onOpen={registerFailedAlert}
        onClose={() => setRegisterFailedAlert(false)}
      />
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
                  style={{ fontFamily: "Quicksand", fontWeight: "500" }}
                >
                  Create Account
                </Typography>
              </motion.div>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col justify-center items-center max-w-md w-screen gap-4 mt-8">
                  <TextField
                    sx={{ m: 0, width: "37ch" }}
                    label="Fullname"
                    name="full_name"
                    value={formik.values.full_name}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    required
                  ></TextField>
                  <TextField
                    sx={{ m: 0, width: "37ch" }}
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    required
                  ></TextField>
                  <FormControl sx={{ m: 0, width: "37ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
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
                    Register&nbsp;&nbsp;
                    <AddReactionRounded />
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
                  href="/login"
                >
                  Already Have An Account?
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Paper>
      <Box mt={60}>
        <Footer />
      </Box>
    </>
  );
};

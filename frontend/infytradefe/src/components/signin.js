import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { loginSuccess } from "../redux/action";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = " ";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signIn(email, password);
      localStorage.setItem("sessionToken", data.token); // Store session token
      dispatch(loginSuccess(data.user));
      navigate("/marketplace");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    // Handle Google login success
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, mt: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Please login to continue to your account
            </Typography>
            {errorMessage && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                InputProps={{ style: { borderRadius: 15 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{ style: { borderRadius: 15 } }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Keep me logged in"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "primary.dark", borderRadius: 2 }}
              >
                Sign In
              </Button>
              <Divider sx={{ my: 2 }}>or</Divider>
              <Box sx={{ mb: 2 }}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  buttonText="Sign in with Google"
                />
              </Box>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Signin;

import React, { useState } from "react";
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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = { name, email, password };

    try {
      const response = await fetch(" api place here ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              Sign up to enjoy the features of InfyTrade
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={handleNameChange}
                InputProps={{ style: { borderRadius: 15 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                sx={{ mt: 2, mb: 2, bgcolor: "primary.dark", borderRadius: 2 }}
              >
                Sign Up
              </Button>
              <Divider sx={{ my: 2 }}>or</Divider>
              <Box sx={{ mb: 2 }}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  buttonText="Continue with Google"
                />
              </Box>
              <Grid container>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Already have an account? Sign in"}
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

export default Signup;
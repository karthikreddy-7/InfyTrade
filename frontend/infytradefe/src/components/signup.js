import React from 'react';
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
} from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = ' ';

const Signup = () => {
  const handleGoogleLoginSuccess = (response) => {
    console.log('Login Success:', response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Sign up to enjoy the features of InfyTrade
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Keep me logged in"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}
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
                <Link href="#" variant="body2">
                  {'Already have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Signup;

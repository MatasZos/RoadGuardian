'use client';

import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      console.log("Missing email or password");
      return;
    }

    const url = `/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
      const res = await fetch(url);
      const result = await res.json();

      console.log("Login API response:", result);

      if (result.data === "valid") {
        if (result.account_type === "manager") {
          router.push("/manager");
        } else {
          router.push("/customer");
        }
      } else {
        console.log("Login invalid");
      }

    } catch (err) {
      console.error("Login request failed:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Login
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
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
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOG IN
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NextLink} href="/register" variant="body2">
                Don&apos;t have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

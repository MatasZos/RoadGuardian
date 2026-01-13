'use client';

import * as React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    const phoneNumber = data.get('phoneNumber');

    if (!email || !password || !confirmPassword || !phoneNumber) {
      alert("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url =
      `/api/register?email=${encodeURIComponent(email)}` +
      `&password=${encodeURIComponent(password)}` +
      `&confirmPassword=${encodeURIComponent(confirmPassword)}` +
      `&phoneNumber=${encodeURIComponent(phoneNumber)}`;

    try {
      const res = await fetch(url);
      const result = await res.json();

      console.log("Register API response:", result);

      if (result.data === "valid") {
        alert("Registration successful! You can now login.");
        router.push("/login");
      } else {
        alert("Registration failed. Please try again.");
      }

    } catch (err) {
      console.error("Register request failed:", err);
      alert("Server error. Please try again later.");
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
            Register
          </Typography>

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
            autoComplete="new-password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            autoComplete="tel"
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
            Register
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NextLink} href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

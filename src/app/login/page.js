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

export default function LoginPage() {

  const handleSubmit = (event) => {
  console.log("handling login submit")
  event.preventDefault()

  const data = new FormData(event.currentTarget);

   let email = data.get('email')
   let password = data.get('password')

   console.log("Sent email:" + email)
   console.log("Sent password:" + password)

   runDBCallAsync(`/api/login?email=${email}&password=${password}`)

 }; // end handle submit


async function runDBCallAsync(url) {
    const res = await fetch(url)
    const data = await res.json()

    console.log("Login API response:", data)

    if(data.data== "valid"){
      console.log("login is valid!")

      if (data.account_type == "manager") {
        window.location.href = "/manager"
      } else {
        window.location.href = "/customer"
      }
    } else {
      console.log("not valid")
    }
  }

  return (
    <Container maxWidth="sm">
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }} >

    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>

      <Typography variant='h5' sx={{ mb: 2, textAlign: 'center'}}>
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

  ); // end return
}

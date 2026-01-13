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
import NextLink from 'next/link';
import Link from '@mui/material/Link';


export default function RegisterPage() {

  const handleSubmit = (event) => {
  console.log("handling register submit");
  event.preventDefault();

  const data = new FormData(event.currentTarget);

   let email = data.get('email')
   let password = data.get('password')
   let confirmPassword = data.get('confirmPassword')
   let phoneNumber = data.get('phoneNumber')
   
   console.log("Sent email:" + email)
   console.log("Sent password:" + password)
   console.log("Sent confirmPassword:" + confirmPassword)
   console.log("Sent phoneNumber:" + phoneNumber)

   if (!email || !password || !confirmPassword || !phoneNumber) {
    alert("Please fill in all fields!");
    return;
   }

   if (password != confirmPassword) {
    alert("Passwords do not match!");
    return;
   }

   runDBCallAsync(`/api/register?email=${email}&password=${password}&confirmPassword=${confirmPassword}&phoneNumber=${phoneNumber}`)

 }; // end handle submit

async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Register API response:", data);

    if(data.data== "valid") {
      console.log("register is valid!")
      alert("Registration successful! You can now login.")
      window.location.href = "/login"
    } else {
      console.log("not valid")
    }
  }

  return (
    <Container maxWidth="sm">
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }} >
    <Box 
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width: '100%' }}>

        <Typography variant='h5' sx={{ mb: 2, textAlign: 'center'}}>
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

  ); // end return
}
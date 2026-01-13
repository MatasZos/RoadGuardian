"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    // PROTOTYPE LOGIN (mock)
    localStorage.setItem("loggedIn", "true");
    router.push("/");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center" }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Login
          </Typography>

          <Stack spacing={2}>
            <TextField label="Email" required fullWidth />
            <TextField label="Password" type="password" required fullWidth />

            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

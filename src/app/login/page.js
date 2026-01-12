"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 4,
            width: "100%",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Login
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.75, mb: 3 }}>
            Sign in to your RoadGuardian account.
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              size="small"
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
            />

            <Button
              variant="contained"
              size="large"
              sx={{ fontWeight: 700, mt: 1 }}
            >
              Login
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

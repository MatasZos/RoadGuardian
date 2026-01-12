"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          RoadGuardian
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.75, mb: 4 }}>
          Your motorcycle safety and assistance companion.
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: 300, mx: "auto" }}>
          <Button
            component={Link}
            href="/maintenance"
            variant="contained"
            fullWidth
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Maintenance
          </Button>

          <Button
            component={Link}
            href="/breakdown"
            variant="outlined"
            fullWidth
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Emergency
          </Button>

          <Button
            component={Link}
            href="/documents"
            variant="outlined"
            fullWidth
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Documents
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

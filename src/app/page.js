"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "stretch",
          flexDirection: { xs: "column", md: "row" },
          minHeight: { md: "calc(100vh - 120px)" },
        }}
      >
        {/* Side panel (buttons) */}
        <Paper
          elevation={2}
          sx={{
            width: { xs: "100%", md: 320 },
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            Quick Actions
          </Typography>

          <Stack spacing={2}>
            <Button
              component={Link}
              href="/maintenance"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "yellow",
                color: "white",
                fontWeight: 800,
                fontSize: "16px",
                py: 1.5,
                "&:hover": { bgcolor: "#d6c800" },
              }}
            >
              MAINTENANCE
            </Button>

            <Button
              component={Link}
              href="/breakdown"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "limegreen",
                color: "white",
                fontWeight: 800,
                fontSize: "16px",
                py: 1.5,
                "&:hover": { bgcolor: "#2fa82e" },
              }}
            >
              EMERGENCY
            </Button>

            <Button
              component={Link}
              href="/documents"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "red",
                color: "white",
                fontWeight: 800,
                fontSize: "16px",
                py: 1.5,
                "&:hover": { bgcolor: "#cc0000" },
              }}
            >
              DOCUMENTS
            </Button>
          </Stack>
        </Paper>

        {/* Map panel (placeholder) */}
        <Paper
          elevation={2}
          sx={{
            flexGrow: 1,
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            minHeight: { xs: 360, md: "auto" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Map
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              (Google Maps placeholder)
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
              Google Map goes here
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

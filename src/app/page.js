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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* ======================
          QUICK ACTIONS
      ====================== */}
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2">
              Access key features quickly
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <Button
              component={Link}
              href="/maintenance"
              variant="contained"
              sx={{ minWidth: 160 }}
            >
              Maintenance
            </Button>

            <Button
              component={Link}
              href="/breakdown"
              variant="contained"
              className="btn-danger"
              sx={{ minWidth: 160 }}
            >
              Emergency
            </Button>

            <Button
              component={Link}
              href="/documents"
              variant="contained"
              className="btn-documents"
              sx={{ minWidth: 160 }}
            >
              Documents
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* ======================
          IMAGE SECTION
      ====================== */}
      <Paper elevation={0} sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Area Overview
        </Typography>

        <Box
          sx={{
            height: { xs: 420, md: 560 },
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <img
            src="/images/map.png"
            alt="Map overview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
}

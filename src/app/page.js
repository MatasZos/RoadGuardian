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
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "stretch",
          flexDirection: { xs: "column", md: "row" },
          minHeight: { md: "calc(100vh - 120px)" },
        }}
      >
        {/* Side actions */}
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

        {/* Map placeholder panel */}
        <Paper
          elevation={2}
          sx={{
            flexGrow: 1,
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            minHeight: { xs: 420, md: "auto" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            Map
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              minHeight: 420,
              borderRadius: 3,
              border: "1px dashed",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              px: 2,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Map Placeholder
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
                Add an image, embed, or interactive map here later.
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6, mt: 1, display: "block" }}>
                Suggested size: full width, min height 420px
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

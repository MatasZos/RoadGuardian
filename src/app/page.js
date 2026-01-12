"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" elevation={0} sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              RoadGuardian
            </Typography>

            <Avatar
              sx={{
                bgcolor: "transparent",
                color: "#00b0ff",
                border: "2px solid #00b0ff",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "stretch",
            flexDirection: { xs: "column", md: "row" },
            height: { md: "calc(100vh - 120px)" }, 
          }}
        >
          {/* Left panel (buttons) */}
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

            <Typography variant="body2" sx={{ mt: 2.5, opacity: 0.75 }}>
              Map view shows your current area (prototype).
            </Typography>
          </Paper>

          {/* Map panel (placeholder for now) */}
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
    </Box>
  );
}

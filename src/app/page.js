"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";

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
      {/* TOP BAR */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Menu */}
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          {/* Right: Avatar */}
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "#00b0ff",
              border: "2px solid #00b0ff",
            }}
          />
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Three Buttons */}
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 300 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "red",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              py: 1.5,
              "&:hover": { bgcolor: "#cc0000" },
            }}
          >
            EMERGENCY
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "limegreen",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              py: 1.5,
              "&:hover": { bgcolor: "#2fa82e" },
            }}
          >
            MAP
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "orange",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              py: 1.5,
              "&:hover": { bgcolor: "#cc7a00" },
            }}
          >
            MAINTENANCE
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

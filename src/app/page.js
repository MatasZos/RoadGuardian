"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "#00b0ff",
              border: "2px solid #00b0ff",
            }}
          />
        </Toolbar>
      </AppBar>

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
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 300 }}>
          <Button
            component={Link}
            href="/maintenance"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "yellow",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              py: 1.5,
              "&:hover": { bgcolor: "#cc0000" },
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
              fontWeight: "bold",
              fontSize: "18px",
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
              fontWeight: "bold",
              fontSize: "18px",
              py: 1.5,
              "&:hover": { bgcolor: "#cc7a00" },
            }}
          >
            DOCUMENTS
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

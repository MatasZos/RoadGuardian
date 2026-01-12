"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          {/* Clickable title */}
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              "&:hover": { opacity: 0.85 },
            }}
          >
            RoadGuardian
          </Typography>
        </Box>

        <Avatar
          sx={{
            bgcolor: "transparent",
            color: "#00b0ff",
            border: "2px solid #00b0ff",
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

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
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          {/* Title → Home */}
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

        {/* Profile → Login */}
        <IconButton
          component={Link}
          href="/login"
          sx={{ p: 0 }}
          aria-label="Go to login"
        >
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "#00b0ff",
              border: "2px solid #00b0ff",
              width: 36,
              height: 36,
              "&:hover": { opacity: 0.85 },
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

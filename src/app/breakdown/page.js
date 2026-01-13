"use client";

import * as React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function BreakdownPage() {
  const [isActive, setIsActive] = React.useState(false);

  function handleEmergency() {
    setIsActive(true);
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Emergency
        </Typography>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Emergency Assistance
          </Typography>

          {/* central button  */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleEmergency}
              sx={{
                px: 6,
                py: 3,
                borderRadius: 4,
                fontSize: "1.1rem",
                fontWeight: 800,
              }}
            >
              EMERGENCY
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Status panel for now */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 5,
              minHeight: 160,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, opacity: 0.8 }}>
              Status
            </Typography>

            <Stack spacing={1}>
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Current location: Not shared
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Emergency request status: {isActive ? "Active" : "Not active"}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Estimated response time: {isActive ? "10–20 mins (prototype)" : "—"}
              </Typography>
            </Stack>
          </Paper>
        </Paper>
      </Box>
    </Container>
  );
}

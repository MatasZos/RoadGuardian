import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function EmergencyPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* RoadGuardian NavBar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            RoadGuardian
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Page title */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Emergency
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Request immediate roadside assistance.
          </Typography>
        </Box>

        {/* Emergency Assistance Panel */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Emergency Assistance
          </Typography>

          {/* Emergency Button Placeholder */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 3,
                borderRadius: 4,
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              EMERGENCY
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Status Panel */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 5,
              minHeight: 160,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, mb: 1, opacity: 0.8 }}
            >
              Status
            </Typography>

            <Stack spacing={1}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Current location: Not shared
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Emergency request status: Not active
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Estimated response time: —
              </Typography>
            </Stack>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function MaintenancePage() {
  // mock data for prototype only
  const maintenanceHistory = [
    { date: "2026-01-03", type: "Oil Change", notes: "Changed oil + filter" },
    { date: "2025-12-10", type: "Chain Service", notes: "Cleaned + lubed chain" },
    { date: "2025-11-21", type: "Brake Check", notes: "Pads inspected (OK)" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* RoadGuardian (NavBar) */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            RoadGuardian
          </Typography>
          <Typography variant="body2" sx={{ ml: 1, opacity: 0.8 }}>
            (NavBar)
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Maintenance description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Maintenance
          </Typography>

          <List dense sx={{ p: 0 }}>
            <ListItem sx={{ py: 0, px: 0 }}>
              <ListItemText primary="• The user can log new maintenance issues for their motorcycle" />
            </ListItem>
            <ListItem sx={{ py: 0, px: 0 }}>
              <ListItemText primary="• The user can review previously recorded maintenance repairs" />
            </ListItem>
            <ListItem sx={{ py: 0, px: 0 }}>
              <ListItemText primary="• The user can track their motorcycle’s maintenance history over time" />
            </ListItem>
          </List>
        </Box>

        {/* Maintenance Log */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Maintenance Log
          </Typography>

          {/* Add record (prototype only) */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <TextField
              fullWidth
              label="Maintenance type"
              placeholder="e.g., Oil change"
              size="small"
            />
            <TextField
              fullWidth
              label="Notes"
              placeholder="Short details..."
              size="small"
            />
            <Button variant="contained" sx={{ minWidth: 140 }}>
              Add Record
            </Button>
          </Stack>

          {/* History list placeholder */}
          <Paper
            variant="outlined"
            sx={{ borderRadius: 5, p: 2, minHeight: 280 }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, mb: 2, opacity: 0.8 }}
            >
              Maintenance History List View (Prototype)
            </Typography>

            {maintenanceHistory.map((item, idx) => (
              <Box key={idx}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={1}
                  sx={{ py: 1 }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {item.type}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {item.notes}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {item.date}
                    </Typography>
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                    <Button size="small" variant="text">
                      Edit
                    </Button>
                  </Stack>
                </Stack>

                {idx !== maintenanceHistory.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}

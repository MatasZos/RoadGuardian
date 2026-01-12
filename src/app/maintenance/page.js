"use client";

import * as React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function MaintenancePage() {
  const [type, setType] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [maintenanceHistory, setMaintenanceHistory] = React.useState([
    { date: "2026-01-03", type: "Oil Change", notes: "Changed oil + filter" },
    { date: "2025-12-10", type: "Chain Service", notes: "Cleaned + lubed chain" },
    { date: "2025-11-21", type: "Brake Check", notes: "Pads inspected (OK)" },
  ]);

  function handleAddRecord() {
    const trimmedType = type.trim();
    const trimmedNotes = notes.trim();
    if (!trimmedType) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    setMaintenanceHistory((prev) => [
      { date: `${yyyy}-${mm}-${dd}`, type: trimmedType, notes: trimmedNotes || "—" },
      ...prev,
    ]);

    setType("");
    setNotes("");
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Maintenance
        </Typography>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Maintenance Log
          </Typography>

          {/* Add maintenance record (simple prototype form) */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Maintenance type"
              placeholder="e.g., Oil change"
              size="small"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <TextField
              fullWidth
              label="Notes"
              placeholder="Short details..."
              size="small"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ minWidth: 140, fontWeight: 700 }}
              onClick={handleAddRecord}
            >
              Add
            </Button>
          </Stack>

          {/* History list view container like the diagram */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 5,
              p: 2,
              minHeight: 280,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 2, opacity: 0.8 }}>
              Maintenance History
            </Typography>

            {maintenanceHistory.length === 0 ? (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No maintenance records yet.
              </Typography>
            ) : (
              <Box>
                {maintenanceHistory.map((item, idx) => (
                  <Box key={`${item.date}-${idx}`}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
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

                      <Stack direction="row" spacing={1} alignItems="center">
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
              </Box>
            )}
          </Paper>
        </Paper>
      </Box>
    </Container>
  );
}

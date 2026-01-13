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

export default function DocumentsPage() {
  const [docName, setDocName] = React.useState("");
  const [docType, setDocType] = React.useState("");

  // mock data (prototype only)
  const [documents, setDocuments] = React.useState([
    { name: "Insurance Policy", type: "PDF", date: "2025-12-02" },
    { name: "Service Receipt - Oil Change", type: "Image", date: "2025-11-20" },
    { name: "Bike Registration", type: "PDF", date: "2025-10-05" },
  ]);

  function handleAddDocument() {
    const name = docName.trim();
    const type = docType.trim();

    if (!name) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    setDocuments((prev) => [
      { name, type: type || "—", date: `${yyyy}-${mm}-${dd}` },
      ...prev,
    ]);

    setDocName("");
    setDocType("");
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Document Storage
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
          Store and manage your personal bike-related documents.
        </Typography>

        {/* Main prototype panel */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Documents
          </Typography>

          {/* Add document (prototype form) */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Document name"
              placeholder="e.g., Insurance policy"
              size="small"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Type"
              placeholder="e.g., PDF, Image"
              size="small"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ minWidth: 140, fontWeight: 700 }}
              onClick={handleAddDocument}
            >
              Add
            </Button>
          </Stack>

          {/* Documents list view (placeholder container) */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 5,
              p: 2,
              minHeight: 280,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 2, opacity: 0.8 }}>
              Document List (Prototype)
            </Typography>

            {documents.length === 0 ? (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No documents added yet.
              </Typography>
            ) : (
              <Box>
                {documents.map((doc, idx) => (
                  <Box key={`${doc.name}-${idx}`}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={1}
                      sx={{ py: 1 }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {doc.name}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Type: {doc.type}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {doc.date}
                        </Typography>

                        <Button size="small" variant="outlined">
                          View
                        </Button>

                        <Button size="small" variant="text">
                          Remove
                        </Button>
                      </Stack>
                    </Stack>

                    {idx !== documents.length - 1 && <Divider />}
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

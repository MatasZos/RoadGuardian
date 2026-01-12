import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function MaintenancePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Maintenance
          </Typography>

          <Typography sx={{ opacity: 0.8 }}>
            View and manage your motorcycle maintenance records.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

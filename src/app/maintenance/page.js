import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function MaintenancePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Maintenance
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.8 }}>
          Log and review your maintenance records.
        </Typography>
      </Box>
    </Container>
  );
}

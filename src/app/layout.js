import Box from "@mui/material/Box";
import NavBar from "./component/NavBar";

export const metadata = {
  title: "RoadGuardian",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
          <NavBar />
          {children}
        </Box>
      </body>
    </html>
  );
}

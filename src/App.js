import "./App.css";
import { Box, Container } from "@mui/material";
import Home from "./pages/Home";

export default function App() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Home />
            </Box>
        </Container>
    );
}

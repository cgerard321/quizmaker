import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import {Box, Button, Container, Link, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function App() {
    const [count, setCount] = useState(0);
    const [file, setFile] = useState(null);

    function changeHandler(event) {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    // {file?.name || "No file selected"}
    // {file && file.name ? file.name : "No file selected"}

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    File name {file?.name || "No file selected"}
                </Typography>
                <p>You clicked {count} times</p>
                <Button endIcon={<SendIcon />} variant="contained" onClick={() => setCount(count + 1)}>Increment</Button>
                <br/>
                <Box mt={5}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            onChange={changeHandler}
                            hidden
                        />
                    </Button>
                </Box>
                <Copyright websiteName={"QuizMaker"} copyrightYear={new Date().getFullYear()} />
            </Box>
        </Container>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                {props.websiteName}
            </Link>{' '}
            {props.copyrightYear}
            {'.'}
        </Typography>
    );
}

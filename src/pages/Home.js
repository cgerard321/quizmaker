import "../App.css";
import { useState, Fragment } from "react";
import {Box, Button, Container, Link, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Copyright from "../components/Copyright";

export default function Home() {
    const [count, setCount] = useState(0);
    const [file, setFile] = useState(null);

    function changeHandler(event) {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    // {file?.name || "No file selected"}
    // {file && file.name ? file.name : "No file selected"}

    return (
        <Fragment>
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
        </Fragment>
    );
}

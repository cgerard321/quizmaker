import "../App.css";
import { useState, Fragment } from "react";
import {Box, Button, Container, Link, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Copyright from "../components/Copyright";
import FileTextArea from "../components/FileTextArea";

export default function Home() {
    const [count, setCount] = useState(0);
    const [file, setFile] = useState(null);

    function changeHandler(event) {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        //setText(event.target.files[0].name);

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(event.target.files[0], "text/xml");


        /*
        let rawFile = new XMLHttpRequest();
        let allText;
        rawFile.open("GET", event.target.files[0], false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    allText = rawFile.responseText;
                    console.log("allText")
                    console.log(allText);
                }
            }
        }
        setText(allText);
        rawFile.send(null);
        */
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
            <FileTextArea text={file?.name || "nothing to display"} />
            <Copyright websiteName={"QuizMaker"} copyrightYear={new Date().getFullYear()} />
        </Fragment>
    );
}

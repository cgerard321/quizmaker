import "../App.css";
import { useState, Fragment } from "react";
import { Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Copyright from "../components/Copyright";
import FileTextArea from "../components/FileTextArea";
import UploadButton from "../components/UploadButton";
import ParseMoodleXML from "../components/ParseMoodleXML";

export default function Home() {
    const [count, setCount] = useState(0);
    const [file, setFile] = useState("nothing to display");

    // {file?.name || "No file selected"}
    // {file && file.name ? file.name : "No file selected"}

    return (
        <Fragment>
            <Typography variant="h4" component="h1" gutterBottom>
                File name {file?.name || "No file selected"}
            </Typography>
            <p>You clicked {count} times</p>
            <Button endIcon={<SendIcon />} variant="contained" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            <br />
            <UploadButton setFile={setFile} />
            <FileTextArea text={file} />
            <ParseMoodleXML file={file} />
            <Copyright websiteName={"QuizMaker"} copyrightYear={new Date().getFullYear()} />
        </Fragment>
    );
}

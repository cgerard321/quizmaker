import "../App.css";
import { useState, Fragment } from "react";
import { Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Copyright from "../components/Copyright";
import FileTextArea from "../components/FileTextArea";
import UploadButton from "../components/UploadButton";
import ParseMoodleXML from "../components/ParseMoodleXML";
import FileName from "../components/FileName";

export default function Home() {
    const [count, setCount] = useState(0);
    //file object
    const [fileObject, setFileObject] = useState(null);
    //file as text
    const [file, setFile] = useState("nothing to display");

    return (
        <Fragment>
            <FileName name={fileObject?.name || "no file selected"}/>
            <p>You clicked {count} times</p>
            <Button endIcon={<SendIcon />} variant="contained" onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            <br />
            <UploadButton setFile={setFile} setFileObject={setFileObject}/>
            <FileTextArea text={file} />
            <ParseMoodleXML file={fileObject} />
            <Copyright websiteName={"QuizMaker"} copyrightYear={new Date().getFullYear()} />
        </Fragment>
    );
}

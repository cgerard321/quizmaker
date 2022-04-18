import "../App.css";
import { useState, Fragment } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Copyright from "../components/Copyright";
import FileTextArea from "../components/FileTextArea";
import UploadButton from "../components/UploadButton";
import ParseMoodleXML from "../components/ParseMoodleXML";
import FileName from "../components/FileName";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

import classes from "./Home.module.css";

export default function Home() {
    const [count, setCount] = useState(0);
    //file object
    const [fileObject, setFileObject] = useState(null);
    //file as text
    const [file, setFile] = useState("nothing to display");

    return (
        <Fragment>
            <Header />
            <main className={classes.textarea}>
                <UploadButton setFile={setFile} setFileObject={setFileObject} />
                <FileTextArea file={file} />
            </main>
            <Footer />
        </Fragment>
    );
}

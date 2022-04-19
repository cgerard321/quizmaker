import "../App.css";
import { useState, Fragment } from "react";
import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Copyright from "../components/Copyright";
import FileTextArea from "../components/FileTextArea";
import UploadButton from "../components/UploadButton";
import ParseMoodleXML from "../components/ParseMoodleXML";
import FileName from "../components/FileName";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import randomColor from 'randomcolor';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";

import classes from "./Home.module.css";

const useStyles = makeStyles({
    container: {
        marginTop: 80,
        marginRight: 6,
        marginLeft: 6,
        height: "85vh", // So that grids 1 & 4 go all the way down
        minHeight: '50vh', // Give minimum height to a div
        border: "1px solid black",
        fontSize: 30,
        textAlign: "left"
    },
    containerTall: {
        minHeight: 250 // This div has higher minimum height
    }
});

export default function Home() {
    const classes = useStyles();

    const [count, setCount] = useState(0);
    //file object
    const [fileObject, setFileObject] = useState(null);
    //file as text
    const [file, setFile] = useState("nothing to display");

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs>
                <div className={classes.container}>
                    <h3 className="title">Import</h3>

                    <FileTextArea file={file} />
                </div>
            </Grid>
            <Grid item xs>
                <div className={classes.container}>
                    <h3 className="title">Question Bank</h3>
                    <Fragment className={classes.textarea}>
                        <UploadButton setFile={setFile} setFileObject={setFileObject} />
                    </Fragment>
                </div>
            </Grid>
            <Grid item xs>
                <div className={classes.container}>
                    <p>Please select a question or category from the question bank to edit it here.</p>
                </div>
            </Grid>
        </Grid>
    );
}

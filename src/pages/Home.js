import "../App.css";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import FileTextArea from "../components/FileTextArea";
import { makeStyles } from "@material-ui/styles";
import QuestionBankProvider from "../store/QuestionBankProvider";
import QuestionBankSection from "../components/QuestionBankSection/QuestionBankSection";

const useStyles = makeStyles({
    container: {
        marginTop: 80, //leave space for header
        marginRight: 6,
        marginLeft: 6,
        height: "85vh", // So that grids go all the way down to before footer
        minHeight: "50vh", // Give minimum height to a div
        border: "1px solid black",
        fontSize: 30,
        textAlign: "left",
        padding: 20,
    },
    containerTall: {
        minHeight: 250, // This div has higher minimum height
    },
});

export default function Home() {
    const classes = useStyles();

    //file object
    const [fileObject, setFileObject] = useState(null);
    //file as text
    const [file, setFile] = useState("nothing to display");
    //



    return (
        <QuestionBankProvider>
            <Grid container direction="row" spacing={1}>
                <Grid item xs={4}>
                    <div className={classes.container}>
                    <Typography variant="h5" style={{fontWeight: 600}}>Import</Typography>

                        <FileTextArea className={classes.textarea} file={file} />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.container}>
                        <QuestionBankSection
                            setFile={setFile}
                            setFileObject={setFileObject}
                            file={file}
                            fileObject={fileObject}
                        />
                    </div>
                </Grid>
                
            </Grid>
        </QuestionBankProvider>
    );
}

import { Box, Button } from "@mui/material";
import parseMoodleXML from "./ParseMoodleXML";

export default function UploadButton(props) {
    function changeHandler(event) {
        const myFileObject = event.target.files[0];
        props.setFileObject(event.target.files[0]);
        const reader = new FileReader();

        reader.onload = function (evt) {
            props.setFile(evt.target.result);
            parseMoodleXML(evt);
        };

        reader.readAsText(myFileObject, "UTF-8");
    }

    return (
        <Box mt={5}>
            <Button variant="contained" component="label">
                Upload File
                <input type="file" onChange={changeHandler} hidden />
            </Button>
        </Box>
    );
}

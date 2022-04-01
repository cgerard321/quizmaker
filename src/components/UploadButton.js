import { Box, Button } from "@mui/material";

export default function UploadButton(props) {
    function changeHandler(event) {
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        props.setFileObject(event.target.files[0]);
        const reader = new FileReader();

        reader.onload = function (evt) {
            props.setFile(evt.target.result);
        };

        reader.readAsText(file, "UTF-8");
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

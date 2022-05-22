import { Box, Button, Tooltip } from "@mui/material";
import { AiOutlineUpload, AiFillFolderOpen } from "react-icons/ai";

export default function UploadButton(props) {
    function changeHandler(event) {
        //event.preventDefault();
        const myFileObject = event.target.files[0];
        props.setFileObject(event.target.files[0]);
        const reader = new FileReader();

        reader.onload = function (evt) {
            //evt.preventDefault();
            props.setFile(evt.target.result);
        };

        reader.readAsText(myFileObject, "UTF-8");
    }

    return (
        <Box mt={1}>
            <Tooltip title={"Upload a file"} placement="top" arrow>
                <Button variant="outlined" size="small" component="label" aria-label="upload a file"
                    style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        minWidth: "30px",
                        minHeight: "30px",
                        color: 'black',
                        borderColor: 'black'
                    }}>
                    <AiFillFolderOpen />
                    <input type="file" onChange={changeHandler} hidden />
                </Button>
            </Tooltip>
        </Box>
    );
}

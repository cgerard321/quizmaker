import { Box, Button, Tooltip } from "@mui/material";
import { AiOutlineUpload, AiFillFolderOpen } from "react-icons/ai";

export default function UploadButton(props) {
    function changeHandler(event) {
        const myFileObject = event.target.files[0];
        props.setFileObject(event.target.files[0]);
        props.setUploadedXMLFileName(event.target.files[0].name);
        const reader = new FileReader();

        reader.onload = function (evt) {
            props.setFile(evt.target.result);
        };

        reader.readAsText(myFileObject, "UTF-8");
    }

    return (
            <Tooltip title={"Upload a file"} placement="top" arrow>
                <Button variant="outlined" size="small" component="label" aria-label="upload a file"
                style={{
                        width: "10px",
                        height: "30px",
                        color: 'black',
                        borderColor: 'black'
                    }}>
                    <AiFillFolderOpen />
                    <input type="file" onChange={changeHandler} hidden />
                </Button>
            </Tooltip>
    );
}

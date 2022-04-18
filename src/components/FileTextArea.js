import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function FileTextArea(props) {
    let fileString = "no file";

    if (props.file != null) {
        fileString = props.file;
    }

    return (
        <TextareaAutosize
            aria-label="minimum height"
            style={{ boxSizing: "border-box", width: 300 }}
            minRows={10}
            value={fileString}
        />
    );
}

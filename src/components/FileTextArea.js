import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function FileTextArea(props) {
    return <TextareaAutosize aria-label="minimum height" minRows={5} value={props.text} style={{ width: 300 }} />;
}

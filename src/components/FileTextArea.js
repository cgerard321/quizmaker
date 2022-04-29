import TextareaAutosize from "@mui/base/TextareaAutosize";

//add state to manage contents of textarea

export default function FileTextArea(props) {
    let fileString = "no file";

    if (props.file != null) {
        fileString = props.file;
    }

    const onChangeHandler = (event) => {
        var contents = event.target.value;
        console.log(contents);
    };

    return (
        <TextareaAutosize
            aria-label="minimum height"
            style={{
                boxSizing: "border-box",
                width: "80%",
                resize: "vertical",
                overflow: "auto",
            }}
            minRows={10}
            maxRows={25}
            value={fileString}
            onChange={onChangeHandler}
        />
    );
}

import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, {useState} from 'react';

export default function FileTextArea(props) {
    const [text, setText] = useState("");

    return (
        <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            value={props.text}
            style={{ width: 300 }}
        />
    );
}
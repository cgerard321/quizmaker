import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function QuestionEditor(props) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleChange = (questionText) => {
        //need to pass updated question data back to tree

        console.log('Updated question text: ' + questionText);

        
    }

    console.log('Editor selected node: ' + props.selectedNode?.text + "none");

    const questionText = props.selectedNode?.data.question.question_text ?? <p>This is default text.</p>

    return (
        <>

            <Editor
                textareaName="content"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={questionText}
                onEditorChange={handleChange}
                init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}

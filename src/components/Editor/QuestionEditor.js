import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./QuestionEditor.module.css";

export default function QuestionEditor(props) {

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const questionText = props.selectedNode?.data.question.question_text ?? <p>This is default text.</p>
    const questionName = () => {
        return props.selectedNode?.text ?? "Question";
    }

    const questionType = () => {
        if (props.selectedNode) {
            switch (props.selectedNode?.data.questionType) {
                case "description":
                    return "Description";

                case "multichoice":
                    return "Multiple Choice";

                case "truefalse":
                    return "True/False";

                case "essay":
                    return "Essay";

                case "shortanswer":
                    return "Short Answer";

                case "category":
                    return "Category";
            }
        }
        else {
            return "";
        }
    }

    return (
        <>
            <div>
                <h5>{questionType()}</h5>
            </div>
            {!props.selectedNode.droppable &&
                <p>For more information on this question type, please consult
                    <a href="https://docs.moodle.org/310/en/Description_question_type"
                        target="_blank">the official Moodle documentation.
                    </a>
                </p>
            }
            <input
                type="text"
                defaultValue={questionName()}
                onChange={props.onNameChange} />
            {!props.selectedNode.droppable &&
                <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={questionText}
                    onEditorChange={props.onTextChange}
                    init={{
                        height: 250,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />}
        </>
    );
}

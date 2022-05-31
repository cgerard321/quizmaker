import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    Typography,
    TextField,
    Box,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableHead,
    TableBody
} from "@mui/material";
import styles from "./QuestionEditor.module.css";
import { ItemTypes } from "@minoru/react-dnd-treeview";

export default function QuestionEditor(props) {


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };


    const questionText = props.selectedNode?.data.question.question_text ?? <p>This is default text.</p>
    //const questionName = props.selectedNode?.text ?? "Question";

    const [questionName, setQuestionName] = useState(props.selectedNode?.text ?? "Question");
    const [defaultGrade, setDefaultGrade] = useState(props.selectedNode?.data.question.defaultGrade ?? 0.00);
    const [penalty, setPenalty] = useState(props.selectedNode?.data.question.penalty ?? 0.00);
    const [choices, setChoices] = useState(props.selectedNode?.data.question.choicesFull ?? [{
        text: "",
        feedback: "",
        value: 0
    }]);

    useEffect(() => {
        setQuestionName(props.selectedNode?.text);
        setDefaultGrade(props.selectedNode?.data.question.default_grade);
        setPenalty(props.selectedNode?.data.question.penalty);
        setChoices(props.selectedNode?.data.question.choicesFull);
    }, [props.selectedNode]);

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
            <Typography variant="h6">{questionType()}</Typography>
            {!props.selectedNode.droppable &&
                <Typography variant="body1">For more information on this question type, please consult&nbsp;
                    <a href="https://docs.moodle.org/310/en/Description_question_type"
                        target="_blank">the official Moodle documentation.
                    </a>
                </Typography>
            }
            <TextField
                type="text"
                id="name"
                name="name"
                label="Name"
                size="small"
                sx={{ width: 400, marginTop: 2 }}
                value={questionName}
                onChange={(e) => {
                    setQuestionName(e.target.value);
                    props.onFieldChange(e);
                }} />
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
            {!props.selectedNode.droppable && props.selectedNode.data.questionType !== "description" &&
                <Box
                    mt={1}
                    display="flex"
                    justifyContent="flex-start"
                    align-items="flex-start">
                    <TextField
                        type="number"
                        id="defaultGrade"
                        name="defaultGrade"
                        label="Default Grade"
                        size="small"
                        sx={{ width: 90, mx: 0.5 }}
                        inputProps={{
                            maxLength: 6,
                            step: "1"
                        }}
                        value={parseFloat(defaultGrade).toFixed(2)}
                        onChange={(e) => {
                            setDefaultGrade(parseFloat(e.target.value).toFixed(2));
                            props.onFieldChange(e);
                        }} />

                    <TextField
                        type="number"
                        id="penalty"
                        name="penalty"
                        label="Penalty"
                        size="small"
                        sx={{ width: 90, mx: 0.5 }}
                        inputProps={{
                            maxLength: 6,
                            step: "1"
                        }}
                        value={parseFloat(penalty).toFixed(2)}
                        onChange={(e) => {
                            setPenalty(parseFloat(e.target.value).toFixed(2));
                            props.onFieldChange(e);
                        }} />
                </Box>
            }

            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell width="10%">#</TableCell>
                            <TableCell width="30%">Choices</TableCell>
                            <TableCell width="30%">Feedback</TableCell>
                            <TableCell width="20%">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {choices && choices.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    {i + 1}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="text"
                                        id="choiceText"
                                        name="choiceText"
                                        value={row.text}
                                        size="small"
                                        onChange={(e) => {
                                            setChoices((prevChoices) => {
                                                prevChoices[i].text = e.target.value;
                                                return prevChoices;
                                            });
                                            props.onChoiceChange(e, i);
                                        }}
                                        />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="text"
                                        id="choiceFeedback"
                                        name="choiceFeedback"
                                        value={row.feedback}
                                        size="small"
                                        onChange={(e) => {
                                            setChoices((prevChoices) => {
                                                prevChoices[i].feedback = e.target.value;
                                                return prevChoices;
                                            });
                                            props.onChoiceChange(e, i);
                                        }} />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        id="choiceValue"
                                        name="choiceValue"
                                        value={row.value}
                                        size="small" 
                                        inputProps={{
                                            min: 0,
                                            max: 100,
                                            step: "1"
                                        }}
                                        onChange={(e) => {
                                            setChoices((prevChoices) => {
                                                prevChoices[i].value = e.target.value;
                                                return prevChoices;
                                            });
                                            props.onChoiceChange(e, i);
                                        }}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

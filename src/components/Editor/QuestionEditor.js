import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
    Typography,
    TextField,
    Box,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    FormControlLabel,
    FormControl,
    Checkbox,
    Select,
    InputLabel,
    MenuItem,
    TextareaAutosize
} from "@mui/material";
import styles from "./QuestionEditor.module.css";
import { ItemTypes } from "@minoru/react-dnd-treeview";
import * as Constants from "../../constants/questionBankConstants.js";

const useStyles = makeStyles({
    tableCell: {
        padding: "0px 0px 0px 0px"
    },

    customTable: {
        "& .MuiTableCell-sizeSmall": {
            padding: "0px 0px 0px 0px" // <-- arbitrary value
        }
    },
});

export default function QuestionEditor(props) {

    const defaultChoice = {
        text: "",
        feedback: "",
        value: 0
    };

    const classes = useStyles();

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
    const [singleAnswer, setSingleAnswer] = useState(props.selectedNode?.data.question.single_answer ?? false);
    const [shuffleAnswers, setShuffleAnswers] = useState(props.selectedNode?.data.question.shuffle_answers ?? false);
    const [numbering, setNumbering] = useState(props.selectedNode?.data.question.numbering ?? Constants.answer_numbering[1]);
    const [choices, setChoices] = useState(props.selectedNode?.data.question.choicesFull ?? [defaultChoice]);

    useEffect(() => {
        setQuestionName(props.selectedNode?.text);
        setDefaultGrade(props.selectedNode?.data.question.default_grade);
        setPenalty(props.selectedNode?.data.question.penalty);
        setSingleAnswer(props.selectedNode?.data.question.single_answer);
        setShuffleAnswers(props.selectedNode?.data.question.shuffle_answers);
        setNumbering(props.selectedNode?.data.question.numbering)
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
                        height: 200,
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
            {!props.selectedNode.droppable && props.selectedNode.data.questionType === "multichoice" &&
                <Box
                    mt={1}
                    display="flex"
                    justifyContent="flex-start"
                    align-items="flex-start">

                    <FormControlLabel
                        name="singleAnswer"
                        control={<Checkbox
                            checked={singleAnswer}
                            onChange={(e) => {
                                setSingleAnswer(e.target.checked);
                                props.onFieldChange(e);
                            }} />}
                        label={
                            <Typography sx={{ fontSize: 14 }}>
                                Single Answer
                            </Typography>}
                    />

                    <FormControlLabel
                        name="shuffleAnswers"
                        control={<Checkbox
                            checked={shuffleAnswers}
                            onChange={(e) => {
                                setShuffleAnswers(e.target.checked);
                                props.onFieldChange(e);
                            }} />}
                        label={
                            <Typography sx={{ fontSize: 14 }}>
                                Shuffle Answers
                            </Typography>}
                    />


                    <TextField
                        sx={{ width: 100 }}
                        id="numbering"
                        name="numbering"
                        value={Constants.answer_numbering[numbering]}
                        label="Numbering"
                        select
                        size="small"
                        onChange={(e) => {
                            setNumbering(Constants.answer_numbering.indexOf(e.target.value));
                            props.onFieldChange(e);
                        }}>
                        {
                            Constants.answer_numbering.map((type, i) => {
                                return <MenuItem value={type} key={i}>{type} </MenuItem>
                            })
                        }
                    </TextField>
                </Box>
            }

            <TableContainer sx={{ height: 250, width: 800 }}>
                <Table stickyHeader size="small" sx={{ width: "max-content", height: "max-content" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell >#</TableCell>
                            <TableCell align="center">Choices</TableCell>
                            <TableCell align="center">Feedback</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {choices && choices.map((row, i) => (
                            <TableRow key={i}  >
                                <TableCell component="th" scope="row" >
                                    {i + 1}
                                </TableCell>
                                <TableCell align="right">
                                    <TextareaAutosize
                                        type="text"
                                        id="choiceText"
                                        name="choiceText"
                                        value={row.text}
                                        maxRows={2.5}
                                        minRows={2.5}
                                        variant="outlined"
                                        style={{ minWidth: 250 }}
                                        resize="both"
                                        onChange={(e) => {
                                            setChoices((prevChoices) => {
                                                prevChoices[i].text = e.target.value;
                                                return prevChoices;
                                            });
                                            props.onChoiceEdit(e, i, "choiceText");
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextareaAutosize
                                        type="text"
                                        id="choiceFeedback"
                                        name="choiceFeedback"
                                        value={row.feedback}
                                        size="small"
                                        maxRows={2.5}
                                        minRows={2.5}
                                        onChange={(e) => {
                                            setChoices((prevChoices) => {
                                                prevChoices[i].feedback = e.target.value;
                                                return prevChoices;
                                            });
                                            props.onChoiceEdit(e, i, "choiceFeedback");
                                        }} />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        type="number"
                                        id="choiceValue"
                                        name="choiceValue"
                                        value={row.value}
                                        sx={{ mx: 0.5 }}
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
                                            props.onChoiceEdit(e, i, "choiceValue");
                                        }} />
                                </TableCell>
                                <TableCell
                                    onClick={(e) => {
                                        const newChoices = [];
                                        setChoices((prevChoices) => {
                                            prevChoices.splice(i, 0, defaultChoice);
                                            console.log("Current state of prevChoices");
                                            console.log(prevChoices);
                                            newChoices.push(...prevChoices);
                                            return prevChoices;
                                        });
                                        props.onChoiceTableModify("choiceAdd", newChoices);
                                    }}>
                                    <AddIcon name="add" />
                                </TableCell>

                                <TableCell
                                    onClick={(e) => {
                                        const newChoices = [];
                                        setChoices((prevChoices) => {
                                            console.log("i is: " + i)
                                            console.log(i);
                                            prevChoices.splice(i, 1);
                                            console.log("Current state of prevChoices");
                                            console.log(prevChoices);
                                            newChoices.push(...prevChoices);
                                            return prevChoices;
                                        });
                                        props.onChoiceTableModify("choiceDelete", newChoices);
                                    }}>
                                    <DeleteIcon name="delete" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

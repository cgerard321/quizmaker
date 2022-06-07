import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box } from "@mui/material";
import { Tree } from "@minoru/react-dnd-treeview";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { StylesProvider } from "@material-ui/styles";
import { CustomNode } from "./CustomNode";
import { treeTheme } from "../../treeTheme";
import styles from "./QBTree.module.css";
import { loadXMLFile } from "./UtilityFunctions/loadXMLFile.js";
import { postLoadCleanUp } from "./UtilityFunctions/postLoadCleanUp";
import { updateQuestionCategories } from "./UtilityFunctions/updateQuestionCategories.js";
import { getDumCatKey } from "./UtilityFunctions/getDumCatKey";
import { copyNode } from "./UtilityFunctions/helper";
import QuestionEditor from "../Editor/QuestionEditor";
import * as Constants from "../../constants/questionBankConstants.js";

// const useStyles = makeStyles({
//     container: {
//         marginTop: 3, //leave space for header
//         marginRight: 6,
//         marginLeft: 6,
//         height: "85vh", // So that grids go all the way down to before footer
//         minHeight: "25vh", // Give minimum height to a div
//         //border: "1px solid black",
//         width: "100%",
//         fontSize: 20,
//         textAlign: "left",
//         paddingTop: 5,
//         marginBottom: 100,
//     },
//     containerTall: {
//         minHeight: 250, // This div has higher minimum height
//     },
// });

const QBTree = (props) => {

    //const classes = useStyles();

    //const [treeData, setTreeData] = useState(defaultTree);
    //const handleDrop = (newTree) => setTreeData(newTree);
    const [selectedNode, setSelectedNode] = useState(null);



    const handleSelect = (node) => {
        console.log("Current node: " + node.text);
        console.log(node);
        setSelectedNode(node);
    };

    const handleFieldChange = (e) => {
        const newTree = props.treeData.map((node) => {

            if (node.id === selectedNode.id) {
                const newNode = copyNode(node);
                switch (e.target.name) {
                    case "name":
                        newNode.text = e.target.value;
                        newNode.data.question.name = e.target.value;
                        break;
                    case "defaultGrade":
                        newNode.data.question.default_grade = e.target.value;
                        break;
                    case "penalty":
                        newNode.data.question.penalty = e.target.value;
                        break;
                    case "singleAnswer":
                        console.log("SingleAnswer");
                        console.log(e.target.value);
                        newNode.data.question.single_answer = e.target.checked;
                        break;
                    case "shuffleAnswers":
                        newNode.data.question.shuffle_answers = e.target.checked;
                        break;
                    case "numbering":
                        newNode.data.question.numbering = Constants.answer_numbering.indexOf(e.target.value);
                        break;
                    case "caseSensitive":
                        newNode.data.question.case_sensitive = e.target.checked;
                        break;
                    default:
                        console.log("Event for choices:")
                        console.log(e);

                }
                return newNode;
            }
            return node;
        });
        props.setTreeData(newTree);
    }

    const handleChoiceEdit = (e, index) => {
        const newTree = props.treeData.map((node) => {

            if (node.id === selectedNode.id) {
                const newNode = copyNode(node);
                switch (e.target.name) {
                    case "choiceText":
                        newNode.data.question.choicesFull[index].text = e.target.value;
                        console.log("new choice text for index: " + index);
                        console.log(e.target.value);
                        break;

                    case "choiceFeedback":
                        newNode.data.question.choicesFull[index].feedback = e.target.value;
                        console.log("new choice feedback for index: " + index);
                        console.log(e.target.value);
                        break;

                    case "choiceValue":
                        newNode.data.question.choicesFull[index].value = e.target.value;

                        console.log("new choice value for index: " + index);
                        console.log(e.target.value);
                        break;



                    default:
                        console.log("Event for choices:")
                        console.log(e);

                }
                return newNode;
            }
            return node;
        });
        props.setTreeData(newTree);
    }

    const handleChoiceTableModify = (action, choices) => {
        const newTree = props.treeData.map((node) => {
            if (node.id === selectedNode.id) {
                const newNode = copyNode(node);

                switch (action) {

                    case "choiceDelete":
                        console.log("Choices received");
                        console.log(choices);
                        console.log("Choices before deletion")
                        newNode.data.question.choicesFull.splice(0, newNode.data.question.choicesFull.length);
                        newNode.data.question.choicesFull = choices;
                        console.log("choice after deletion");
                        console.log(newNode.data.question.choicesFull);
                        break;

                    case "choiceAdd":
                        console.log("Choices received");
                        console.log(choices);
                        console.log("Choices before addition")
                        console.log(newNode.data.question.choicesFull);
                        newNode.data.question.choicesFull.splice(0, newNode.data.question.choicesFull.length);
                        newNode.data.question.choicesFull = choices;
                        console.log("Choices after addition");
                        console.log(newNode.data.question.choicesFull);
                        break;

                    default:
                        console.log("No action");

                }
                return newNode;
            }
            return node;
        });
        props.setTreeData(newTree);
    }


    const handleQuestionTextChange = (value) => {
        const newTree = props.treeData.map((node) => {

            console.log("value is: " + value);

            if (node.id === selectedNode.id) {

                let newNode = copyNode(node);
                newNode.data.question.question_text = value;

                return newNode;
            }
            return node;
        });
        props.setTreeData(newTree);
    }

    const myFile = props.file;

    const questionbank = [];

    const question_categories = []; //use this to keep track of the categories

    const buildQuestionBankFromXMLFile = () => {
        loadXMLFile(questionbank, myFile);
        //console.log('4 questionbank length: ' + questionbank.length);
        postLoadCleanUp(questionbank);

        updateQuestionCategories(question_categories, questionbank);

        console.log("Printing out questionbank before Id numbering");
        console.log(questionbank);

        //assign unique ids to each question
        for (let i = 0; i < questionbank.length; i++) {
            questionbank[i].id = i;
        }
        console.log("Printing out questionbank");
        console.log(questionbank);
    };

    const getParentCategoryKey = (question, questionbank) => {
        let parentCat = question.category.replace(question.name, "");
        //console.log('last char is: ' + parentCat.charAt(parentCat.length - 1));
        if (parentCat.charAt(parentCat.length - 1) === "/") {
            //console.log("last char is a /");
            parentCat = parentCat.slice(0, parentCat.length - 1);
        }
        parentCat.trim();
        // console.log("Question Name: " + question.name);
        // console.log("Question Category: " + question.category);
        // console.log("Parent category: " + parentCat);
        let parentKey = getDumCatKey(parentCat, questionbank);
        // console.log('ParentKey is: ' + parentKey);
        return parentKey;
    };

    const buildTreeFromQuestionBank = (questionbank) => {
        const myTreeData = [];

        for (let i = 0; i < questionbank.length; i++) {
            let data = {
                id: questionbank[i].id,
                text: questionbank[i].name,
                parent: getParentCategoryKey(questionbank[i], questionbank),
                droppable: questionbank[i].type === "category" ? true : false,
                data: {
                    questionType: questionbank[i].type,
                    question: questionbank[i],
                },
            };
            myTreeData.push(data);
        }

        console.log("Printing out myTreeData");
        console.log(myTreeData);

        props.setTreeData([...myTreeData]);
    };

    useEffect(() => {
        console.log("Open case");
        buildQuestionBankFromXMLFile(props.file, questionbank);
        buildTreeFromQuestionBank(questionbank);
    }, [props.file]);

    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={treeTheme}>
                <CssBaseline />
                <div
                    style={{
                        //backgroundColor: "orange",
                        height: "85%",
                        display: "flex",

                    }}>
                    <Grid container direction={'row'} spacing={2} style={{
                        //backgroundColor: "yellow",
                        minHeight: "100%",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        marginLeft: '0.25vw',
                        overflowY: "hidden"
                    }}>
                        <Grid item xs={4} style={{
                            //backgroundColor: "lightgreen",
                            maxHeight: "100%",
                            overflowY: "auto",
                        }}>
                            <Tree
                                tree={props.treeData}
                                rootId={-1}
                                render={(node: NodeModel<CustomData>,
                                    { depth, isOpen, onToggle }
                                ) => (
                                    <CustomNode
                                        node={node}
                                        depth={depth}
                                        isOpen={isOpen}
                                        onToggle={onToggle}
                                        isSelected={node.id === selectedNode?.id}
                                        onSelect={handleSelect} />
                                )}
                                classes={{
                                    root: styles.treeRoot,
                                    draggingSource: styles.draggingSource,
                                    dropTarget: styles.dropTarget,
                                }}
                                sort={false}
                                insertDroppableFirst={false}
                            />
                        </Grid>
                        <Grid item xs={8} style={{
                            //backgroundColor: "lightgreen",
                            maxHeight: "100%",
                            overflowY: "auto"
                        }}>
                            {selectedNode && <QuestionEditor
                                selectedNode={selectedNode}
                                onFieldChange={handleFieldChange}
                                onTextChange={handleQuestionTextChange}
                                onChoiceEdit={handleChoiceEdit}
                                onChoiceTableModify={handleChoiceTableModify} />}
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        </StylesProvider >
    );
}; //end QBTree

export default QBTree;

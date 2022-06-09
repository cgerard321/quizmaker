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

const QBTree = (props) => {

    const [selectedNode, setSelectedNode] = useState(null);

    const handleSelect = (node) => {
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

    const handleTagEdit = (updatedTags) => {
        const newTree = props.treeData.map((node) => {

            if (node.id === selectedNode.id) {
                const newNode = copyNode(node);
                newNode.data.question.tags = updatedTags;
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
                        break;

                    case "choiceFeedback":
                        newNode.data.question.choicesFull[index].feedback = e.target.value;
                        break;

                    case "choiceValue":
                        newNode.data.question.choicesFull[index].value = e.target.value;
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
                        newNode.data.question.choicesFull.splice(0, newNode.data.question.choicesFull.length);
                        newNode.data.question.choicesFull = choices;
                        break;

                    case "choiceAdd":
                        newNode.data.question.choicesFull.splice(0, newNode.data.question.choicesFull.length);
                        newNode.data.question.choicesFull = choices;
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
        postLoadCleanUp(questionbank);
        updateQuestionCategories(question_categories, questionbank);

        //assign unique ids to each question
        for (let i = 0; i < questionbank.length; i++) {
            questionbank[i].id = i;
        }
    };

    const getParentCategoryKey = (question, questionbank) => {

        let parentCat;
        if (question.type === "category") {
            parentCat = question.category.replace(question.name, "");

            if (parentCat.charAt(parentCat.length - 1) === "/") {
                parentCat = parentCat.slice(0, parentCat.length - 1);
            }
            parentCat.trim();

        } else {
            parentCat = question.category;
        }

        let parentKey = getDumCatKey(parentCat, questionbank);

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

        props.setTreeData([...myTreeData]);
    };

    useEffect(() => {
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
                                onChoiceTableModify={handleChoiceTableModify}
                                onTagChange={handleTagEdit} />}
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        </StylesProvider >
    );
}; //end QBTree

export default QBTree;

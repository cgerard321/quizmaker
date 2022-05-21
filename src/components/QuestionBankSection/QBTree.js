import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Tree } from "@minoru/react-dnd-treeview";
import defaultTree from "./defaultTree.json";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { StylesProvider } from "@material-ui/styles";
import { CustomNode } from "./CustomNode";
import { treeTheme } from "../../treeTheme";
import styles from "./QBTree.module.css";
import { loadXMLFile } from "./UtilityFunctions/loadXMLFile.js";
import { postLoadCleanUp } from "./UtilityFunctions/postLoadCleanUp";
import { updateQuestionCategories } from "./UtilityFunctions/updateQuestionCategories.js";
import { getDumCatKey } from "./UtilityFunctions/getDumCatKey";
import EditorSection from "../Editor/EditorSection";
import {copyNode} from "./UtilityFunctions/helper";

const QBTree = (props) => {
    const [treeData, setTreeData] = useState(defaultTree);
    //const handleDrop = (newTree) => setTreeData(newTree);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleSelect = (node) => {
        console.log("Current node: " + node.text);
        console.log(node);
        setSelectedNode(node);
    };

    const handleQuestionNameChange = (value) => {
        const newTree = treeData.map((node) => {

            console.log("value is: " + value.target.value);

            if (node.id === selectedNode.id) {
            
                let newNode = copyNode(node);
                newNode.text = value.target.value;
                newNode.data.question.name = value.target.value;

                return newNode;
            }
            return node;
        });
        setTreeData(newTree);
    }

    const handleQuestionTextChange = (value) => {
        const newTree = treeData.map((node) => {

            console.log("value is: " + value);

            if (node.id === selectedNode.id) {
                
                let newNode = copyNode(node);
                newNode.data.question.question_text = value;

                return newNode;
            }
            return node;
        });
        setTreeData(newTree);
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

        setTreeData([...myTreeData]);
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
                <Grid container direction="row" spacing={2}>
                    <Grid item xs>
                        <div className={styles.app}>
                            <div className={styles.current}>
                                <p>
                                    Current node:{" "}
                                    <span className={styles.currentLabel}>
                                        {selectedNode ? selectedNode.text : "none"}
                                    </span>
                                </p>
                            </div>
                            <Tree
                                tree={treeData}
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
                        </div>
                    </Grid>
                    <Grid item xs>
                        {selectedNode && <EditorSection
                            selectedNode={selectedNode}
                            setSelectedNode={setSelectedNode}
                            onNameChange={handleQuestionNameChange}
                            onTextChange={handleQuestionTextChange} />}
                    </Grid>
                </Grid>
            </ThemeProvider>
        </StylesProvider >
    );
}; //end QBTree

export default QBTree;

import React, { useState, useEffect } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import SampleData from "./sample-data.json";
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
import { MyLocationTwoTone } from "@material-ui/icons";

const QBTree = (props) => {

    const [treeData, setTreeData] = useState(defaultTree);
    //const handleDrop = (newTree) => setTreeData(newTree);

    const myFile = props.file;
    //console.log(myFile);

    const questionbank = [];

    const question_categories = []; //use this to keep track of the categories


    // const handleSubmit = (newNode) => {
    //     const lastId = getLastId(treeData) + 1;

    //     setTreeData([
    //         ...treeData,
    //         {
    //             ...newNode,
    //             id: lastId
    //         }
    //     ])
    // };


    // const handleResetTree = () => {
    //     setTreeData(defaultTree);
    // }

    // const getLastId = (treeData) => {
    //     const reversedArray = [...treeData].sort((a, b) => {
    //         if (a.id < b.id) {
    //             return 1;
    //         } else if (a.id > b.id) {
    //             return -1;
    //         }

    //         return 0;
    //     });

    //     if (reversedArray.length > 0) {
    //         return reversedArray[0].id;
    //     }

    //     return 0;
    // };

    const buildQuestionBankFromXMLFile = () => {
        loadXMLFile(questionbank, myFile);
        //console.log('4 questionbank length: ' + questionbank.length);
        postLoadCleanUp(questionbank);

        updateQuestionCategories(question_categories, questionbank);

        //assign unique ids to each question
        for (let i = 0; i < questionbank.length; i++) {
            questionbank[i].id = i;
        }
        console.log("Printing out questionbank");
        console.log(questionbank);
    }

    const getParentCategoryKey = (question, questionbank) => {

        let parentCat = question.category.replace(question.name, "");
        //console.log('last char is: ' + parentCat.charAt(parentCat.length - 1));
        if (parentCat.charAt(parentCat.length - 1) == '/') {
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
                droppable: questionbank[i].type === 'category' ? true : false,
                data: { questionType: questionbank[i].type }
            }
            myTreeData.push(data);
        }

        console.log('Printing out myTreeData');
        console.log(myTreeData)

        setTreeData([...myTreeData]);
    }

    useEffect(() => {
        console.log("Open case");
        buildQuestionBankFromXMLFile(props.file, questionbank);
        buildTreeFromQuestionBank(questionbank);

    }, [props.file]);



    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={treeTheme}>
                <CssBaseline />
                <div className={styles.app}>
                    <Tree
                        tree={treeData}
                        rootId={-1}
                        render={(node, { depth, isOpen, onToggle }) => (
                            <CustomNode
                                node={node}
                                depth={depth}
                                isOpen={isOpen}
                                onToggle={onToggle}
                            />
                        )}

                        classes={{
                            root: styles.treeRoot,
                            draggingSource: styles.draggingSource,
                            dropTarget: styles.dropTarget
                        }}
                    />
                </div>
            </ThemeProvider>
        </StylesProvider>
    );
};//end QBTree

export default QBTree;
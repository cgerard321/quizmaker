import React, { useState } from 'react';
import { Stack } from "@mui/material";
import UploadButton from "../UploadButton";
import { Fragment } from "react";
import { AiFillBank } from "react-icons/ai";
import QBTree from "./QBTree";
import { Typography } from "@mui/material";
import defaultTree from "./defaultTree.json";
import ExportAllMoodleButton from "../ExportAllMoodleButton";
import PopUpFileName from '../PopUpFileName';

const QuestionBankSection = (props) => {

    const [treeData, setTreeData] = useState(defaultTree);


    return (
        <Fragment>
            <Typography variant="h5" style={{ fontWeight: 600 }}>Question Bank<AiFillBank /></Typography>
            <Stack
                spacing={0.5}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start">
                <UploadButton setFile={props.setFile} setFileObject={props.setFileObject} />
                <ExportAllMoodleButton treeData={treeData}/>
            </Stack>
            <QBTree
                file={props.file}
                selectedNode={props.selectedNode}
                setSelectedNode={props.setSelectedNode}
                treeData={treeData}
                setTreeData={setTreeData}
            />
        </Fragment>
    );
};

export default QuestionBankSection;

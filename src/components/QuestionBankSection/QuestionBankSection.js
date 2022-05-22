import UploadButton from "../UploadButton";
import { Fragment } from "react";
import { AiFillBank } from "react-icons/ai";
import QBTree from "./QBTree";
import {Typography} from "@mui/material";

const QuestionBankSection = (props) => {
    return (
        <Fragment>
            <Typography variant="h5" style={{fontWeight: 600}}>Question Bank<AiFillBank /></Typography>
            <UploadButton setFile={props.setFile} setFileObject={props.setFileObject} />
            <QBTree
                file={props.file}
                selectedNode={props.selectedNode}
                setSelectedNode={props.setSelectedNode}
            />
        </Fragment>
    );
};

export default QuestionBankSection;

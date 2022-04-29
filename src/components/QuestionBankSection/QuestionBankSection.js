import UploadButton from "../UploadButton";
import { Fragment } from "react";
import { AiFillBank } from "react-icons/ai";
import QBTree from "./QBTree";

const QuestionBankSection = (props) => {
    return (
        <Fragment>
            <h3 className="title">
                Question Bank <AiFillBank />
            </h3>
            <UploadButton setFile={props.setFile} setFileObject={props.setFileObject} />
            <QBTree file={props.file} action="OPEN" />
        </Fragment>
    );
};

export default QuestionBankSection;

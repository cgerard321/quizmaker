import { Fragment } from "react";
import QuestionEditor from "./QuestionEditor";

const EditorSection = (props) => {
    return (
        <Fragment>
            <h3 className="title">Select and edit a question</h3>
            <QuestionEditor />
        </Fragment>
    );
};

export default EditorSection;

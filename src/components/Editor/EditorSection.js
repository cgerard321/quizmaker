import { Fragment } from "react";
import QuestionEditor from "./QuestionEditor";

const EditorSection = (props) => {
    return (

        <QuestionEditor
            selectedNode={props.selectedNode}
            setSelectedNode={props.setSelectedNode}
            onNameChange={props.onNameChange} 
            onTextChange={props.onTextChange}/>

    );
};

export default EditorSection;

import {useState} from 'react';
import UploadButton from '../UploadButton';
import { Fragment } from 'react';
import WidgetTree from './CheckboxTree';
import { AiFillBank } from 'react-icons/ai';
import QBTree from '../QBTree';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  }; 

  

const QuestionBankSection = (props) => {

    const [treeIsShown, setTreeIsShown] = useState(false);

    const showTreeHandler = () => {
        setTreeIsShown(true);
        //console.log("treeIsShown: " + treeIsShown);
    }

    const hideTreeHandler = () => {
        setTreeIsShown(false);
        //console.log("treeIsShown: " + treeIsShown);
    }

    //add a new inner for the tree.
    //This Tree can call the parsing methods.
    //It will also have methods to create the nodes and handle all the select/unselects
    //Then it will use the WidgetTree component and pass it the nodes, etc. that WidgetTree needs

    return (
        <Fragment>
            <h3 className="title">Question Bank <AiFillBank /></h3>
            <UploadButton onShowTree={showTreeHandler} setFile={props.setFile} setFileObject={props.setFileObject} />
           {treeIsShown && <QBTree file={props.file} />}
        </Fragment>
    )

};

export default QuestionBankSection;
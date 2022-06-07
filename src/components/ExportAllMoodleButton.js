import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from "@mui/material";

import DownloadIcon from '@mui/icons-material/Download';
import PopUpFileName from './PopUpFileName';
import {exportXMLFile } from "./QuestionBankSection/UtilityFunctions/exportXMLFile.js";

export default function ExportAllMoodleButton(props) {

    //modal state
    const [showPopup, setShowPopup] = useState(false);
    const [xmlfilename, setXmlFileName] = useState("");

    const handleBtnClick = (e) => {
        setShowPopup(true);       
    };

    useEffect(() => {
        if (xmlfilename != "")
            exportXMLFile(xmlfilename, props.treeData);
    }, [xmlfilename]);


    return (
        <div>
            <Tooltip title={"Export All Questions as Moodle XML"} placement="top" arrow>
                <Button variant="outlined" size="small" component="label" aria-label="Export All Questions"
                    style={{
                        width: "10px",
                        height: "30px",
                        color: 'black',
                        borderColor: 'black'
                    }}
                    onClick={handleBtnClick}
                    >
                    <DownloadIcon />
                </Button>
                
            </Tooltip>
            <PopUpFileName show={showPopup} onClose={setShowPopup} onClick={setXmlFileName}/> 
                   </div>
    );

}

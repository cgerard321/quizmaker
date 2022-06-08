import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button, TextField, Stack } from '@mui/material';


export default function PopUpFileName(props) {

    const [name, setName] = useState(props.defaultFileName);
    const [showPopup, setShowPopup] = useState(props.show);

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = () => {
        props.onClick(name);
        setShowPopup(false);
        setName("");
    }

    
    const handleCancel = () => {
        setShowPopup(false);
        setName("");
    }

    useEffect(() => {
        setShowPopup(props.show);
        console.log("Value of show in Popup is: " + props.show);
        setName(props.defaultFileName)
    }, [props.show, props.defaultFileName]);

    return (
        <Popup open={showPopup} onClose={() => props.onClose(false)} modal>
                <Stack spacing={2}>
                    <TextField
                        label="Enter a file name:"
                        name="filename"
                        type="text"
                        size="small"
                        sx={{ width: 300 }}
                        value={name}
                        onChange={handleChange}
                    />
                    <Stack direction="row" spacing={2} >
                        <Button variant="contained" onClick={handleSubmit} type="submit">OK</Button>
                        <Button variant="contained" onClick={handleCancel} type="submit">Cancel</Button>

                    </Stack>
                </Stack>
        </Popup>
    )
}
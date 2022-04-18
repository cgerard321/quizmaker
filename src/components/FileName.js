import { Typography } from "@mui/material";

export default function FileName(props) {
    console.log(props.name);
    return (
        <Typography variant="h4" component="h1" gutterBottom>
            File name {props.name}
        </Typography>
    );
}

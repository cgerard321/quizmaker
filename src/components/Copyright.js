import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                {props.websiteName}
            </Link>{" "}
            {props.copyrightYear}
            {"."}
        </Typography>
    );
}

import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="common.white" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/" underline="always">
                {props.websiteName}
            </Link>{" "}
            {props.copyrightYear}
            {"."}
        </Typography>
    );
}

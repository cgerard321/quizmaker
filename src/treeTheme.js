import { createTheme } from "@mui/material";

export const treeTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    margin: 0,
                    padding: 0,
                },
                "html, body, #root": {
                    height: "100%",
                },
                ul: {
                    listStyle: "none",
                },
            },
        },
        MuiSvgIcon: {
            root: { verticalAlign: "middle" },
        },
    },
});

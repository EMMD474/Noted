"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#008080", // Teal
        },
        secondary: {
            main: "#800080", // Purple
        },
    },
    typography: {
        fontFamily: "var(--font-roboto)",
    },
});

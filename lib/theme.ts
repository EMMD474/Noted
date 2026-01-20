"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1a2e35", // Deep Slate Teal
            light: "#3a5058",
            dark: "#0a1a1f",
        },
        secondary: {
            main: "#6366f1", // Indigo
        },
        background: {
            default: "#f8fafc", // Slate 50
            paper: "#ffffff",
        },
        text: {
            primary: "#1e293b", // Slate 800
            secondary: "#64748b", // Slate 500
        },
    },
    typography: {
        fontFamily: "var(--font-roboto)",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                    borderRadius: 16,
                },
            },
        },
    },
});

"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { theme } from "@/lib/theme";

import { NotesProvider } from "@/contexts/NotesProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NotesProvider>{children}</NotesProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}

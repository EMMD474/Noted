"use client";

import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

export default function CalendarPage() {
    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    Calendar
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View your notes and todos in a calendar view.
                </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />

            <Paper
                sx={{
                    p: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                }}
            >
                <CalendarMonth sx={{ fontSize: 100, color: "action.disabled", mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Coming Soon
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center">
                    We are working on bringing a powerful calendar view to help you stay organized.
                </Typography>
            </Paper>
        </Box>
    );
}

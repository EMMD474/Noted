"use client";

import React from "react";
import { Box, Typography, Paper, Stack, Chip, alpha, LinearProgress } from "@mui/material";
import { CalendarMonth, Rocket, NotificationsActive, EventRepeat } from "@mui/icons-material";
import CommingSoon from "@/components/CommingSoon";

export default function CalendarPage() {
    const upcomingFeatures = [
        {
            icon: <CalendarMonth sx={{ fontSize: 20 }} />,
            title: "Calendar View",
            description: "See all your notes and todos organized by date",
        },
        {
            icon: <NotificationsActive sx={{ fontSize: 20 }} />,
            title: "Reminders",
            description: "Set reminders for important tasks and events",
        },
        {
            icon: <EventRepeat sx={{ fontSize: 20 }} />,
            title: "Recurring Tasks",
            description: "Create tasks that repeat daily, weekly, or monthly",
        },
    ];

    return (
        <Box sx={{ py: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        }}
                    >
                        <CalendarMonth sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                            Calendar
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            View your notes and todos in a calendar view
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Coming Soon Card */}
            <CommingSoon upCommingFeatures={upcomingFeatures} />
        </Box>
    );
}

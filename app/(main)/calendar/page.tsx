"use client";

import React from "react";
import { Box, Typography, Paper, Stack, Chip, alpha, LinearProgress } from "@mui/material";
import { CalendarMonth, Rocket, NotificationsActive, EventRepeat } from "@mui/icons-material";
import CommingSoon from "@/components/CommingSoon";
import Heading from "@/components/Heading";

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
            <Heading title="Calendar" description="View your notes and todos in a calendar view" icon={<CalendarMonth sx={{ color: "white", fontSize: 24 }} />} />

            {/* Coming Soon Card */}
            <CommingSoon upCommingFeatures={upcomingFeatures} />
        </Box>
    );
}

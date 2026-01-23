"use client";

import React from "react";
import { Box, Typography, Paper, Stack, Chip, alpha, LinearProgress } from "@mui/material";
import { CalendarMonth, Rocket, NotificationsActive, EventRepeat } from "@mui/icons-material";

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
            <Paper
                elevation={0}
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                {/* Decorative gradient bar */}
                <Box
                    sx={{
                        height: 4,
                        background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                />

                {/* Main content */}
                <Box sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
                    {/* Icon with animated background */}
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                width: 90,
                                height: 90,
                                borderRadius: "50%",
                                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
                            }}
                        />
                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                            }}
                        >
                            <Rocket sx={{ fontSize: 32, color: "white" }} />
                        </Box>
                    </Box>

                    {/* Badge */}
                    <Chip
                        label="Coming Soon"
                        sx={{
                            mb: 3,
                            px: 2,
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            color: "white",
                        }}
                    />

                    {/* Title and description */}
                    <Typography variant="h5" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                        We&apos;re working on something amazing
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 500, mx: "auto", mb: 4, lineHeight: 1.7 }}
                    >
                        Our team is building a powerful calendar feature to help you stay organized
                        and never miss an important task or event.
                    </Typography>

                    {/* Progress indicator */}
                    <Box sx={{ maxWidth: 300, mx: "auto", mb: 5 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                Development Progress
                            </Typography>
                            <Typography variant="caption" color="primary.main" fontWeight={600}>
                                65%
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={65}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 4,
                                    background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                },
                            }}
                        />
                    </Box>

                    {/* Upcoming features */}
                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, mb: 3, display: "block" }}>
                        Upcoming Features
                    </Typography>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        justifyContent="center"
                    >
                        {upcomingFeatures.map((feature) => (
                            <Paper
                                key={feature.title}
                                elevation={0}
                                sx={{
                                    flex: 1,
                                    maxWidth: { md: 220 },
                                    p: 3,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    textAlign: "left",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        borderColor: "primary.light",
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 36,
                                        height: 36,
                                        borderRadius: 1.5,
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                        color: "primary.main",
                                        mb: 2,
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

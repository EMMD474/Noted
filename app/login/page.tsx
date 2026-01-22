"use client";

import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { LoginForm } from "@/components/LoginForm";
import { SignForm } from "@/components/SignForm";
import { NoteAlt, CheckCircleOutline, CalendarMonth } from "@mui/icons-material";

export default function LoginPage() {
    const [showLogin, setShowLogin] = useState(true);
    const theme = useTheme();

    const toggleForm = () => {
        setShowLogin((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                minHeight: "100vh",
            }}
        >
            {/* Left side - Branding */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "45%",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    p: 6,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative circles */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: -50,
                        left: -50,
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                    }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        Noted
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgba(255,255,255,0.8)",
                            fontWeight: 400,
                            mb: 6,
                            maxWidth: 400,
                        }}
                    >
                        Your personal space to organize thoughts, tasks, and schedules.
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <NoteAlt sx={{ color: "#fff", fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                                    Quick Notes
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                    Capture ideas instantly
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CheckCircleOutline sx={{ color: "#fff", fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                                    Task Management
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                    Stay on top of your todos
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: "rgba(255,255,255,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CalendarMonth sx={{ color: "#fff", fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                                    Calendar View
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                                    Plan your schedule visually
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Right side - Form */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: theme.palette.background.default,
                    p: 3,
                }}
            >
                {showLogin ? (
                    <LoginForm toggle={toggleForm} />
                ) : (
                    <SignForm toggle={toggleForm} />
                )}
            </Box>
        </Box>
    );
}

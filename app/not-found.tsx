"use client";

import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { SentimentDissatisfied, Home, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative background elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(26, 46, 53, 0.03) 0%, rgba(99, 102, 241, 0.05) 100%)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: -150,
                    left: -150,
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(26, 46, 53, 0.05) 100%)",
                }}
            />

            <Container maxWidth="sm">
                <Box
                    sx={{
                        textAlign: "center",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* 404 Number with gradient */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "8rem", sm: "12rem" },
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #1a2e35 0%, #6366f1 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            lineHeight: 1,
                            mb: 2,
                        }}
                    >
                        404
                    </Typography>

                    {/* Icon */}
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            bgcolor: "rgba(26, 46, 53, 0.08)",
                            mb: 3,
                        }}
                    >
                        <SentimentDissatisfied sx={{ fontSize: 48, color: "primary.main" }} />
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h4"
                        color="text.primary"
                        sx={{ fontWeight: 700, mb: 2 }}
                    >
                        Page Not Found
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 400, mx: "auto", lineHeight: 1.7 }}
                    >
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back on track.
                    </Typography>

                    {/* Action buttons */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<Home />}
                            onClick={() => router.push("/notes")}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                boxShadow: "0 8px 24px -6px rgba(26, 46, 53, 0.3)",
                                "&:hover": {
                                    boxShadow: "0 12px 32px -8px rgba(26, 46, 53, 0.4)",
                                },
                            }}
                        >
                            Go to Home
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            startIcon={<ArrowBack />}
                            onClick={() => router.back()}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                borderWidth: 2,
                                "&:hover": {
                                    borderWidth: 2,
                                },
                            }}
                        >
                            Go Back
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

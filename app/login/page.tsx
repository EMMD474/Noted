"use client";

import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { LoginForm } from "@/components/LoginForm";
import { SignForm } from "@/components/SignForm";

export default function LoginPage() {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <Container maxWidth="sm">
                {showLogin ? (
                    <LoginForm toggle={toggleForm} />
                ) : (
                    <SignForm toggle={toggleForm} />
                )}
            </Container>
        </Box>
    );
}

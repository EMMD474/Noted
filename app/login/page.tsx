"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
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
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "whitesmoke",
            }}
        >
            {showLogin ? (
                <LoginForm toggle={toggleForm} />
            ) : (
                <SignForm toggle={toggleForm} />
            )}
        </Box>
    );
}

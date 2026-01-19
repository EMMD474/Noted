"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
    toggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggle }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError("Invalid username or password");
            } else {
                router.push("/notes");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 350,
                p: 4,
                bgcolor: "#fff",
                borderRadius: "0.5em",
                boxShadow: "0.3em 0.3em 0.5em rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                Login
            </Typography>
            <Divider sx={{ width: "80%", mb: 2 }} />

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock color="primary" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                        {error}
                    </Typography>
                )}

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, py: 1 }}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <Divider sx={{ width: "80%", mt: 2, mb: 1 }} />

            <Box sx={{ width: "80%", display: "flex", justifyContent: "space-between", pb: 1 }}>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                        cursor: "pointer",
                        fontSize: "0.9em",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Forgot Password
                </Typography>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                        cursor: "pointer",
                        fontSize: "0.9em",
                        "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={toggle}
                >
                    Sign Up
                </Typography>
            </Box>
        </Box>
    );
};

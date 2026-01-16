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
                width: "100%",
                maxWidth: 400,
                p: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                Login
            </Typography>
            <Divider sx={{ width: "100%", mb: 3 }} />

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
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3, py: 1.5, fontWeight: 700 }}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <Box sx={{ mt: 3, width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">
                    New here?{" "}
                    <Typography
                        component="span"
                        color="primary"
                        sx={{ cursor: "pointer", fontWeight: 600 }}
                        onClick={toggle}
                    >
                        Sign Up
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};

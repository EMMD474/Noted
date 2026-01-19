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
import { AccountCircle, Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignFormProps {
    toggle: () => void;
}

export const SignForm: React.FC<SignFormProps> = ({ toggle }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Auto sign in after registration
                await signIn("credentials", {
                    username,
                    password,
                    callbackUrl: "/notes",
                });
            } else {
                setErrors({ form: data.message || "Registration failed" });
            }
        } catch (err) {
            setErrors({ form: "An unexpected error occurred" });
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
                Sign Up
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
                    error={!!errors.username}
                    helperText={errors.username}
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
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Mail color="primary" />
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
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
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

                {errors.form && (
                    <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                        {errors.form}
                    </Typography>
                )}

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, py: 1 }}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </Button>
            </form>

            <Divider sx={{ width: "80%", mt: 2, mb: 1 }} />

            <Box sx={{ width: "80%", display: "flex", justifyContent: "center", pb: 1 }}>
                <Typography variant="body2" sx={{ fontSize: "0.9em" }}>
                    Already have an account?{" "}
                    <Typography
                        component="span"
                        color="primary"
                        sx={{
                            cursor: "pointer",
                            fontSize: "0.9em",
                            "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={toggle}
                    >
                        Login
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};

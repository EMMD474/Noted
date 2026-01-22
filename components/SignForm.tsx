"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Alert,
    useTheme,
} from "@mui/material";
import { AccountCircle, Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";

interface SignFormProps {
    toggle: () => void;
}

export const SignForm: React.FC<SignFormProps> = ({ toggle }) => {
    const theme = useTheme();
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
                width: "100%",
                maxWidth: 420,
                p: { xs: 3, sm: 5 },
                bgcolor: theme.palette.background.paper,
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            }}
        >
            {/* Mobile branding */}
            <Typography
                variant="h4"
                sx={{
                    display: { xs: "block", md: "none" },
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1,
                    textAlign: "center",
                }}
            >
                Noted
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                }}
            >
                Create an account
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                }}
            >
                Get started with your free account
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle sx={{ color: theme.palette.text.secondary }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Mail sx={{ color: theme.palette.text.secondary }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{ color: theme.palette.text.secondary }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{ color: theme.palette.text.secondary }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    size="small"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {errors.form && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.form}
                    </Alert>
                )}

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    size="large"
                    sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 3,
                    }}
                >
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
            </form>

            <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Already have an account?{" "}
                    <Typography
                        component="span"
                        sx={{
                            color: theme.palette.secondary.main,
                            cursor: "pointer",
                            fontWeight: 600,
                            "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={toggle}
                    >
                        Sign in
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};

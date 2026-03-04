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
    Alert,
    useTheme,
} from "@mui/material";
import { AccountCircle, Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import LoginButton from "./ui/GoogleAuthBtn";

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
        } catch {
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
                p: { xs: 3, sm: 4.5 },
                bgcolor: theme.palette.background.paper,
                borderRadius: 4,
                border: "1px solid rgba(15, 23, 42, 0.08)",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.10)",
                backdropFilter: "blur(8px)",
                "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(248, 250, 252, 0.9)",
                    borderRadius: 2,
                    "& fieldset": { borderColor: "rgba(15, 23, 42, 0.16)" },
                    "&:hover fieldset": { borderColor: "rgba(15, 23, 42, 0.3)" },
                    "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
                },
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    width: "fit-content",
                    px: 1.25,
                    py: 0.5,
                    mb: 1.5,
                    borderRadius: 999,
                    fontWeight: 700,
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    bgcolor: "rgba(26, 46, 53, 0.08)",
                    color: "primary.main",
                }}
            >
                Start your workspace
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                    fontSize: { xs: "1.65rem", sm: "1.85rem" },
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
                Set up your account and start organizing
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
                    slotProps={{
                        inputLabel: { shrink: true },
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
                    slotProps={{
                        inputLabel: { shrink: true },
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
                    slotProps={{
                        inputLabel: { shrink: true },
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
                    slotProps={{
                        inputLabel: { shrink: true },
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
                        py: 1.4,
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 3,
                        background:
                            "linear-gradient(135deg, rgba(26,46,53,1) 0%, rgba(58,80,88,1) 100%)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, rgba(10,26,31,1) 0%, rgba(26,46,53,1) 100%)",
                        },
                    }}
                >
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
            </form>

            <Divider sx={{ my: 2 }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, px: 1 }}>
                    or continue with
                </Typography>
            </Divider>

            <LoginButton />

            <Box sx={{ textAlign: "center", mt: 2 }}>
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

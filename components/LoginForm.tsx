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
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
    toggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggle }) => {
    const router = useRouter();
    const theme = useTheme();
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
                Welcome back
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                }}
            >
                Sign in to continue to your account
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2.5 }}
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
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 1 }}
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

                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.secondary.main,
                            cursor: "pointer",
                            fontWeight: 500,
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Forgot password?
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
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
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {"Don't have an account? "}
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
                        Create one
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};

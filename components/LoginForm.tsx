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
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginButton from "./ui/GoogleAuthBtn";

interface LoginFormProps {
    toggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ toggle }) => {
    const router = useRouter();
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/notes");
            }
        } catch {
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
                Welcome to Noted
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
                Welcome back
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                }}
            >
                Sign in with your email to continue to your account
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2.5 }}
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
                    slotProps={{
                        inputLabel: { shrink: true },
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
                    {loading ? "Signing in..." : "Sign In"}
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Box, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

function GoogleIcon() {
    return (
        <Box
            component="svg"
            viewBox="0 0 48 48"
            aria-hidden="true"
            sx={{ width: 18, height: 18 }}
        >
            <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.193 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.84 1.154 7.958 3.042l5.657-5.657C34.046 6.053 29.28 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
            />
            <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.84 1.154 7.958 3.042l5.657-5.657C34.046 6.053 29.28 4 24 4C16.318 4 9.656 8.337 6.306 14.691Z"
            />
            <path
                fill="#4CAF50"
                d="M24 44c5.177 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.091 26.661 36 24 36c-5.172 0-9.625-3.316-11.287-7.946l-6.522 5.025C9.501 39.556 16.227 44 24 44Z"
            />
            <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.085 5.571h-.001l6.19 5.238C36.971 39.169 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
            />
        </Box>
    );
}

export default function LoginButton() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        if (session) {
            router.push("/notes");
            return;
        }

        setLoading(true);
        await signIn("google", { callbackUrl: "/notes" });
        setLoading(false);
    };

    return (
        <>
            <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignIn}
                disabled={loading}
                startIcon={<GoogleIcon />}
                sx={{
                    borderColor: "rgba(15, 23, 42, 0.12)",
                    bgcolor: "#fff",
                    color: "text.primary",
                    fontWeight: 600,
                    py: 1.2,
                    "&:hover": {
                        borderColor: "rgba(15, 23, 42, 0.24)",
                        bgcolor: "#f8fafc",
                    },
                }}
            >
                {session ? "Continue to Noted" : loading ? "Connecting..." : "Continue with Google"}
            </Button>
            {session?.user?.email && (
                <Typography
                    variant="caption"
                    sx={{ display: "block", textAlign: "center", mt: 1, color: "text.secondary" }}
                >
                    Signed in as {session.user.email}
                </Typography>
            )}
        </>
    );
}

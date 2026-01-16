"use client";

import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import { Close, WhatsApp, Instagram, Telegram, Share } from "@mui/icons-material";
import { X as XIcon } from "@mui/icons-material";
import { Tooltip, Stack, Typography } from "@mui/material";

interface NoteDetailModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    content: string;
}

export const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
    open,
    handleClose,
    title,
    content,
}) => {
    const shareItems = [
        { name: "WhatsApp", icon: <WhatsApp sx={{ color: "#25D366" }} /> },
        { name: "Instagram", icon: <Instagram sx={{ color: "#E4405F" }} /> },
        { name: "X", icon: <XIcon sx={{ color: "#000000" }} /> },
        { name: "Telegram", icon: <Telegram sx={{ color: "#0088cc" }} /> },
    ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, pr: 6, fontWeight: 700, bgcolor: "primary.main", color: "white" }}>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "white",
                        "&:hover": { color: "error.light" },
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ bgcolor: "whitesmoke" }}>
                <Box sx={{ py: 2, minHeight: 100 }}>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", color: "text.primary" }}>
                        {content}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Stack direction="row" spacing={2}>
                    {shareItems.map((item) => (
                        <IconButton key={item.name} size="medium">
                            <Tooltip title={item.name}>{item.icon}</Tooltip>
                        </IconButton>
                    ))}
                </Stack>
                <Button onClick={handleClose} variant="contained" color="primary" fullWidth sx={{ fontWeight: 600 }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};


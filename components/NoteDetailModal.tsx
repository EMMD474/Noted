"use client";

import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box,
    Tooltip,
    Stack,
    Typography,
    alpha,
} from "@mui/material";
import { Close, WhatsApp, Instagram, Telegram, ContentCopy, Share } from "@mui/icons-material";
import { X as XIcon } from "@mui/icons-material";

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
        { name: "WhatsApp", icon: <WhatsApp />, color: "#25D366" },
        { name: "Instagram", icon: <Instagram />, color: "#E4405F" },
        { name: "X", icon: <XIcon />, color: "#000000" },
        { name: "Telegram", icon: <Telegram />, color: "#0088cc" },
    ];

    const handleCopyContent = () => {
        navigator.clipboard.writeText(`${title}\n\n${content}`);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden",
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    m: 0,
                    p: 3,
                    pr: 6,
                    fontWeight: 700,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: "white",
                }}
            >
                {title}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                        color: "white",
                        "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                        },
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        p: 3,
                        minHeight: 150,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: "pre-wrap",
                            color: "text.primary",
                            lineHeight: 1.8,
                        }}
                    >
                        {content}
                    </Typography>
                </Box>
            </DialogContent>

            {/* Footer */}
            <DialogActions
                sx={{
                    p: 3,
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {/* Share section */}
                <Box sx={{ width: "100%" }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} sx={{ mb: 2 }}>
                        <Share sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Share this note
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        {shareItems.map((item) => (
                            <Tooltip key={item.name} title={item.name}>
                                <IconButton
                                    size="medium"
                                    sx={{
                                        color: item.color,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        "&:hover": {
                                            bgcolor: alpha(item.color, 0.1),
                                            borderColor: item.color,
                                        },
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                        <Tooltip title="Copy to clipboard">
                            <IconButton
                                size="medium"
                                onClick={handleCopyContent}
                                sx={{
                                    color: "text.secondary",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    "&:hover": {
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                        borderColor: "primary.main",
                                        color: "primary.main",
                                    },
                                }}
                            >
                                <ContentCopy />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                {/* Close button */}
                <Button
                    onClick={handleClose}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        fontWeight: 600,
                        py: 1.25,
                        boxShadow: "0 4px 14px -4px rgba(26, 46, 53, 0.4)",
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

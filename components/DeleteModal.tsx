"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    Box,
    alpha,
} from "@mui/material";
import { WarningAmber, Delete } from "@mui/icons-material";
import { useNotes } from "@/contexts/NotesProvider";

interface DeleteModalProps {
    open: boolean;
    handleClose: () => void;
    noteId: number;
    noteTitle: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    open,
    handleClose,
    noteId,
    noteTitle,
}) => {
    const { setNotesUpdated } = useNotes();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/notes/${noteId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setNotesUpdated((prev) => !prev);
                handleClose();
            } else {
                console.error("Failed to delete note");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    maxWidth: 400,
                },
            }}
        >
            <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 1 }}>
                <Box
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                        mb: 2,
                    }}
                >
                    <WarningAmber sx={{ fontSize: 32, color: "error.main" }} />
                </Box>
                <Box sx={{ fontWeight: 700 }}>Delete Note?</Box>
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center", px: 4 }}>
                <DialogContentText sx={{ color: "text.secondary" }}>
                    Are you sure you want to delete &quot;<strong>{noteTitle}</strong>&quot;? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
                <Button
                    onClick={handleClose}
                    disabled={isDeleting}
                    fullWidth
                    variant="outlined"
                    sx={{
                        py: 1.25,
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": { borderWidth: 2 },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    color="error"
                    variant="contained"
                    fullWidth
                    disabled={isDeleting}
                    startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : <Delete />}
                    sx={{
                        py: 1.25,
                        fontWeight: 600,
                        boxShadow: "0 4px 14px -4px rgba(239, 68, 68, 0.4)",
                        "&:hover": {
                            boxShadow: "0 6px 20px -4px rgba(239, 68, 68, 0.5)",
                        },
                    }}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

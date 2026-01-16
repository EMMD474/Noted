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
} from "@mui/material";
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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Note?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete "<strong>{noteTitle}</strong>"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} disabled={isDeleting}>
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                    startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

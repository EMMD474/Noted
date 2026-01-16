"use client";

import React, { useEffect } from "react";
import { Box, Typography, Grid, Divider, CircularProgress } from "@mui/material";
import { useNotes } from "@/contexts/NotesProvider";
import { NoteCard } from "@/components/NoteCard";

export default function NotesPage() {
    const { notes, getNotes, loading, notesUpdated } = useNotes();

    useEffect(() => {
        getNotes();
    }, [notesUpdated]);

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    Notes
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Keep track of your thoughts and ideas.
                </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />

            {loading ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
                    <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading your notes...
                    </Typography>
                </Box>
            ) : notes.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No notes found.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Click the plus icon to create your first note!
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {notes.map((note) => (
                        <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                createdAt={note.createdAt}
                                importance={note.importance}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

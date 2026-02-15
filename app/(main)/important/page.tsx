"use client";

import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Paper, alpha } from "@mui/material";
import { useNotes } from "@/contexts/NotesProvider";
import { NoteCard } from "@/components/NoteCard";
import { LabelImportant, NoteAddOutlined } from "@mui/icons-material";

export default function ImportantPage() {
    const { notes, getNotes, loading, notesUpdated } = useNotes();

    useEffect(() => {
        getNotes();
    }, [notesUpdated]);

    const importantNotes = notes.filter((n) => n.importance.toLowerCase() === "important");

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        mr: 2,
                        bgcolor: alpha("#f59e0b", 0.1),
                        color: "#d97706",
                    }}
                >
                    <LabelImportant sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                        Important Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Key items that require your focus
                    </Typography>
                </Box>
            </Box>

            {loading ? (
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 12,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <CircularProgress size={40} sx={{ color: "#f59e0b", mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                        Loading important notes...
                    </Typography>
                </Paper>
            ) : importantNotes.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 12,
                        borderRadius: 3,
                        border: "2px dashed",
                        borderColor: "divider",
                        bgcolor: (theme) => alpha("#f59e0b", 0.02),
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            bgcolor: alpha("#f59e0b", 0.1),
                            mb: 2,
                        }}
                    >
                        <NoteAddOutlined sx={{ fontSize: 32, color: "#d97706" }} />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
                        No important notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your priority list is clear for now.
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {importantNotes.map((note) => (
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
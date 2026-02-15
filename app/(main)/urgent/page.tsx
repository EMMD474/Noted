"use client";

import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Paper, alpha } from "@mui/material";
import { useNotes } from "@/contexts/NotesProvider";
import { NoteCard } from "@/components/NoteCard";
import { Star, NoteAddOutlined } from "@mui/icons-material";

export default function UrgentNotes() {
    const { notes, getNotes, loading, notesUpdated } = useNotes();

    useEffect(() => {
        getNotes();
    }, [notesUpdated]);

    const urgentNotes = notes.filter((n) => n.importance.toLowerCase() === "urgent");

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
                        bgcolor: alpha("#ef4444", 0.1),
                        color: "#ef4444",
                    }}
                >
                    <Star sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                        Urgent Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        High priority items that need attention
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
                    <CircularProgress size={40} sx={{ color: "#ef4444", mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                        Loading urgent notes...
                    </Typography>
                </Paper>
            ) : urgentNotes.length === 0 ? (
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
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.02),
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
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                            mb: 2,
                        }}
                    >
                        <NoteAddOutlined sx={{ fontSize: 32, color: "#ef4444" }} />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
                        No urgent notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You&apos;re all caught up with high priority items!
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {urgentNotes.map((note) => (
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
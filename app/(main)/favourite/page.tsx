"use client";

import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Paper, alpha } from "@mui/material";
import { useNotes } from "@/contexts/NotesProvider";
import { NoteCard } from "@/components/NoteCard";
import { Favorite, NoteAddOutlined } from "@mui/icons-material";

export default function FavouritePage() {
    const { notes, getNotes, loading, notesUpdated } = useNotes();

    useEffect(() => {
        getNotes();
    }, [notesUpdated]);

    const favouriteNotes = notes.filter((n) => n.favourite);

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
                        bgcolor: alpha("#f43f5e", 0.1),
                        color: "#f43f5e",
                    }}
                >
                    <Favorite sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                        Favourite Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your most loved and important thoughts
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
                    <CircularProgress size={40} sx={{ color: "#f43f5e", mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                        Loading favourite notes...
                    </Typography>
                </Paper>
            ) : favouriteNotes.length === 0 ? (
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
                        bgcolor: (theme) => alpha("#f43f5e", 0.02),
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
                            bgcolor: alpha("#f43f5e", 0.1),
                            mb: 2,
                        }}
                    >
                        <NoteAddOutlined sx={{ fontSize: 32, color: "#f43f5e" }} />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
                        No favourite notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tap the heart icon on any note to save it here!
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {favouriteNotes.map((note) => (
                        <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                createdAt={note.createdAt}
                                importance={note.importance}
                                favourite={note.favourite}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
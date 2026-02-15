"use client";

import React, { useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Paper, Chip, Stack, alpha } from "@mui/material";
import { useNotes } from "@/contexts/NotesProvider";
import { NoteCard } from "@/components/NoteCard";
import { NoteAddOutlined, AutoAwesome } from "@mui/icons-material";

export default function NotesPage() {
    const { notes, getNotes, loading, notesUpdated } = useNotes();

    useEffect(() => {
        getNotes();
    }, [notesUpdated]);

    // Count notes by importance
    const urgentCount = notes.filter(n => n.importance === "urgent").length;
    const importantCount = notes.filter(n => n.importance === "important").length;
    const normalCount = notes.filter(n => n.importance === "normal").length;

    return (
        <Box sx={{ py: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        }}
                    >
                        <AutoAwesome sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                            Notes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Keep track of your thoughts and ideas
                        </Typography>
                    </Box>
                </Stack>

                {/* Stats chips */}
                {!loading && notes.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Chip
                            label={`${notes.length} Total`}
                            size="small"
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                color: "primary.main",
                                fontWeight: 600,
                            }}
                        />
                        {urgentCount > 0 && (
                            <Chip
                                label={`${urgentCount} Urgent`}
                                size="small"
                                sx={{
                                    bgcolor: alpha("#ef4444", 0.1),
                                    color: "#ef4444",
                                    fontWeight: 600,
                                }}
                            />
                        )}
                        {importantCount > 0 && (
                            <Chip
                                label={`${importantCount} Important`}
                                size="small"
                                sx={{
                                    bgcolor: alpha("#f59e0b", 0.1),
                                    color: "#d97706",
                                    fontWeight: 600,
                                }}
                            />
                        )}
                        {normalCount > 0 && (
                            <Chip
                                label={`${normalCount} Normal`}
                                size="small"
                                sx={{
                                    bgcolor: alpha("#10b981", 0.1),
                                    color: "#059669",
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Stack>
                )}
            </Box>

            {/* Content Section */}
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
                    <Box
                        sx={{
                            position: "relative",
                            mb: 3,
                        }}
                    >
                        <CircularProgress size={56} thickness={3} sx={{ color: "primary.main" }} />
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            }}
                        />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                        Loading your notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please wait a moment...
                    </Typography>
                </Paper>
            ) : notes.length === 0 ? (
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
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            mb: 3,
                        }}
                    >
                        <NoteAddOutlined sx={{ fontSize: 40, color: "primary.main" }} />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 1 }}>
                        No notes yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: "center", maxWidth: 300 }}>
                        Start capturing your thoughts and ideas by creating your first note.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Click the + button below to get started
                    </Typography>
                </Paper>
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
                                favourite={note.favourite}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

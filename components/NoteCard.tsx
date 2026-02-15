"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardActions,
    IconButton,
    Box,
    CardContent,
    Typography,
    Tooltip,
    alpha,
} from "@mui/material";
import { Delete, Favorite, Share, AccessTime } from "@mui/icons-material";
import { DeleteModal } from "./DeleteModal";
import { NoteDetailModal } from "./NoteDetailModal";

interface NoteCardProps {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    importance: string;
    favourite: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({
    id,
    title,
    content,
    createdAt,
    importance,
    favourite,
}) => {
    const { setNotesUpdated } = useNotes();
    const [fav, setFav] = useState(favourite);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const handleFavouriteToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newFav = !fav;
        setFav(newFav);

        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favourite: newFav }),
            });

            if (res.ok) {
                setNotesUpdated((prev) => !prev);
            } else {
                setFav(!newFav); // Rollback
                console.error("Failed to update favourite status");
            }
        } catch (error) {
            setFav(!newFav); // Rollback
            console.error("Error updating favourite status:", error);
        }
    };

    const getImportanceStyles = (imp: string) => {
        switch (imp.toLowerCase()) {
            case "urgent":
                return {
                    bgcolor: alpha("#ef4444", 0.1),
                    color: "#ef4444",
                    borderColor: "#ef4444",
                };
            case "important":
                return {
                    bgcolor: alpha("#f59e0b", 0.1),
                    color: "#d97706",
                    borderColor: "#f59e0b",
                };
            default:
                return {
                    bgcolor: alpha("#10b981", 0.1),
                    color: "#059669",
                    borderColor: "#10b981",
                };
        }
    };

    const importanceStyles = getImportanceStyles(importance);

    const formattedDate = new Date(createdAt).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <>
            <Card
                onClick={() => setDetailModalOpen(true)}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.12)",
                        borderColor: "primary.light",
                    },
                }}
            >
                <CardHeader
                    avatar={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                borderRadius: 1.5,
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                border: "2px solid",
                                ...importanceStyles,
                            }}
                        >
                            {importance.charAt(0).toUpperCase()}
                        </Box>
                    }
                    action={
                        <Tooltip title="Delete note">
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteModalOpen(true);
                                }}
                                size="small"
                                sx={{
                                    color: "text.secondary",
                                    "&:hover": {
                                        color: "error.main",
                                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                                    },
                                }}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                    title={
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color="text.primary"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {title}
                        </Typography>
                    }
                    subheader={
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                            <AccessTime sx={{ fontSize: 14, color: "text.secondary", mr: 0.5 }} />
                            <Typography variant="caption" color="text.secondary">
                                {formattedDate}
                            </Typography>
                        </Box>
                    }
                    sx={{ pb: 1 }}
                />
                <CardContent sx={{ flexGrow: 1, pt: 0, pb: 1 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.7,
                        }}
                    >
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ px: 2, pb: 2, pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
                    <Tooltip title={fav ? "Remove from favorites" : "Add to favorites"}>
                        <IconButton
                            onClick={handleFavouriteToggle}
                            size="small"
                            sx={{
                                color: fav ? "#f43f5e" : "text.secondary",
                                transition: "all 0.2s",
                                "&:hover": {
                                    bgcolor: alpha("#f43f5e", 0.1),
                                    color: "#f43f5e",
                                },
                            }}
                        >
                            <Favorite fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share note">
                        <span>
                            <IconButton
                                disabled
                                size="small"
                                sx={{
                                    color: "text.secondary",
                                    "&:hover": {
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                    },
                                }}
                            >
                                <Share fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </CardActions>
            </Card>

            <DeleteModal
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                noteId={id}
                noteTitle={title}
            />

            <NoteDetailModal
                open={detailModalOpen}
                handleClose={() => setDetailModalOpen(false)}
                title={title}
                content={content}
            />
        </>
    );
};

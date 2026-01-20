"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardActions,
    IconButton,
    Avatar,
    CardContent,
    Typography,
} from "@mui/material";
import { Delete, Favorite, Share } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { DeleteModal } from "./DeleteModal";
import { NoteDetailModal } from "./NoteDetailModal";

interface NoteCardProps {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    importance: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({
    id,
    title,
    content,
    createdAt,
    importance,
}) => {
    const [fav, setFav] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const getImportanceColor = (imp: string) => {
        switch (imp.toLowerCase()) {
            case "urgent":
                return "#ef4444"; // Red 500
            case "important":
                return "#f59e0b"; // Amber 500
            default:
                return "#10b981"; // Emerald 500
        }
    };

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
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        cursor: "pointer",
                        transform: "translateY(-4px)",
                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        // borderColor: "primary.light",
                    },
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{
                                bgcolor: "transparent",
                                color: getImportanceColor(importance),
                                border: `2px solid ${getImportanceColor(importance)}`,
                                width: 32,
                                height: 32,
                                fontSize: "0.875rem",
                                fontWeight: 700
                            }}
                        >
                            {importance.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteModalOpen(true);
                            }}
                            size="small"
                        >
                            <Delete size="small" sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }} />
                        </IconButton>
                    }
                    title={<Typography variant="subtitle1" fontWeight={700} color="text.primary">{title}</Typography>}
                    subheader={<Typography variant="caption" color="text.secondary">{formattedDate}</Typography>}
                />
                <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.6
                        }}
                    >
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ px: 2, pb: 2 }}>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setFav(!fav);
                        }}
                        size="small"
                    >
                        <Favorite
                            fontSize="small"
                            sx={{
                                color: fav ? "#f43f5e" : "text.secondary",
                                transition: "0.2s"
                            }}
                        />
                    </IconButton>
                    <IconButton disabled size="small">
                        <Share fontSize="small" sx={{ color: "text.secondary" }} />
                    </IconButton>
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

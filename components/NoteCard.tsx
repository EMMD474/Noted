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
                return "#FF6347"; // Tomato
            case "important":
                return "orange";
            default:
                return "teal";
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
                    transition: "0.3s ease-in-out",
                    "&:hover": {
                        cursor: "pointer",
                        boxShadow: (theme) => theme.shadows[4],
                    },
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: getImportanceColor(importance) }}>
                            {importance.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => setDeleteModalOpen(true)}>
                            <Delete sx={{ color: red[400] }} />
                        </IconButton>
                    }
                    title={<Typography variant="subtitle1" fontWeight={600}>{title}</Typography>}
                    subheader={formattedDate}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={() => setFav(!fav)}>
                        <Favorite sx={{ color: fav ? getImportanceColor(importance) : "inherit" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Share />
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

"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Checkbox,
    IconButton,
    Stack,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { red, teal } from "@mui/material/colors";
import { useNotes } from "@/contexts/NotesProvider";

interface TodoItemProps {
    id: number;
    title: string;
    checked: boolean;
    createdAt: string;
    importance: string;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    id,
    title,
    checked,
    createdAt,
    importance,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isChecked, setIsChecked] = useState(checked);
    const [isDeleting, setIsDeleting] = useState(false);
    const { setNotesUpdated } = useNotes();

    const handleToggle = async () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);

        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ checked: newChecked }),
            });

            if (!res.ok) {
                setIsChecked(!newChecked); // Rollback
                console.error("Failed to update todo status");
            }
        } catch (error) {
            setIsChecked(!newChecked); // Rollback
            console.error("Error updating todo status:", error);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setNotesUpdated((prev) => !prev);
            } else {
                console.error("Failed to delete todo");
                setIsDeleting(false);
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
            setIsDeleting(false);
        }
    };

    const formattedDate = new Date(createdAt).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: 600,
                bgcolor: isChecked ? "action.hover" : "background.paper",
                borderRadius: 2,
                mt: 1,
                mb: 1,
                p: 1,
                border: "1px solid",
                borderColor: isChecked ? "teal.100" : "divider",
                transition: "0.2s",
                "&:hover": {
                    boxShadow: theme.shadows[1],
                },
            }}
        >
            <Stack sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Checkbox checked={isChecked} onChange={handleToggle} color="primary" />
                    <Typography
                        variant="body1"
                        sx={{
                            textDecoration: isChecked ? "line-through" : "none",
                            color: isChecked ? "text.secondary" : "text.primary",
                            fontWeight: 500,
                        }}
                    >
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            ml: 2,
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: "0.7rem",
                            bgcolor:
                                importance === "urgent"
                                    ? red[50]
                                    : importance === "important"
                                        ? "orange"
                                        : "teal",
                            color:
                                importance === "urgent"
                                    ? red[700]
                                    : importance === "important"
                                        ? "white"
                                        : "white",
                            textTransform: "uppercase",
                            fontWeight: 700,
                        }}
                    >
                        {importance}
                    </Box>
                </Stack>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 6 }}
                >
                    {formattedDate}
                </Typography>
            </Stack>
            <IconButton
                onClick={handleDelete}
                disabled={isDeleting}
                size="small"
            >
                <Delete sx={{ color: isChecked || isDeleting ? red[400] : "action.disabled" }} />
            </IconButton>
        </Box>
    );
};

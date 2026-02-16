"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Checkbox,
    IconButton,
    Stack,
    useTheme,
    alpha,
    Tooltip,
} from "@mui/material";
import { Delete, AccessTime } from "@mui/icons-material";
import { useNotes } from "@/contexts/NotesProvider";
import { DeleteModal } from "./DeleteModal";

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
    const [isChecked, setIsChecked] = useState(checked);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

    const formattedDate = new Date(createdAt).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const getImportanceStyles = (imp: string) => {
        switch (imp.toLowerCase()) {
            case "urgent":
                return {
                    bgcolor: alpha("#ef4444", 0.1),
                    color: "#ef4444",
                    borderColor: alpha("#ef4444", 0.3),
                };
            case "important":
                return {
                    bgcolor: alpha("#f59e0b", 0.1),
                    color: "#d97706",
                    borderColor: alpha("#f59e0b", 0.3),
                };
            default:
                return {
                    bgcolor: alpha("#10b981", 0.1),
                    color: "#059669",
                    borderColor: alpha("#10b981", 0.3),
                };
        }
    };

    const importanceStyles = getImportanceStyles(importance);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    bgcolor: isChecked ? alpha(theme.palette.primary.main, 0.02) : "background.paper",
                    borderRadius: 2,
                    mb: 1.5,
                    p: 2,
                    border: "1px solid",
                    borderColor: isChecked ? alpha(theme.palette.primary.main, 0.15) : "divider",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        borderColor: isChecked ? alpha(theme.palette.primary.main, 0.25) : "primary.light",
                        boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
                        transform: "translateY(-1px)",
                    },
                }}
            >
                <Stack sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Checkbox
                            checked={isChecked}
                            onChange={handleToggle}
                            sx={{
                                color: theme.palette.divider,
                                "&.Mui-checked": {
                                    color: "primary.main",
                                },
                                "& .MuiSvgIcon-root": {
                                    fontSize: 24,
                                },
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                flex: 1,
                                textDecoration: isChecked ? "line-through" : "none",
                                color: isChecked ? "text.secondary" : "text.primary",
                                fontWeight: 500,
                                transition: "all 0.2s",
                            }}
                        >
                            {title}
                        </Typography>
                        <Box
                            sx={{
                                ml: 2,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1.5,
                                fontSize: "0.7rem",
                                border: "1px solid",
                                ...importanceStyles,
                                textTransform: "uppercase",
                                fontWeight: 700,
                                letterSpacing: "0.02em",
                            }}
                        >
                            {importance}
                        </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ ml: 5.5, mt: 0.5 }}>
                        <AccessTime sx={{ fontSize: 14, color: "text.secondary", mr: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">
                            {formattedDate}
                        </Typography>
                    </Stack>
                </Stack>
                <Tooltip title="Delete task">
                    <IconButton
                        onClick={() => setDeleteModalOpen(true)}
                        size="small"
                        sx={{
                            ml: 1,
                            color: "text.secondary",
                            "&:hover": {
                                color: "error.main",
                                bgcolor: alpha("#ef4444", 0.1),
                            },
                        }}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            <DeleteModal
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                itemId={id}
                itemName={title}
                itemType="todo"
            />
        </>
    );
};

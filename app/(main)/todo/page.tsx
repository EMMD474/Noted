"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Chip, Stack, alpha, Tabs, Tab } from "@mui/material";
import { TodoItem } from "@/components/TodoItem";
import { useNotes } from "@/contexts/NotesProvider";
import { CheckCircleOutline, PlaylistAddCheck, AccessTime } from "@mui/icons-material";

interface Todo {
    id: number;
    title: string;
    importance: string;
    checked: boolean;
    createdAt: string;
}

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const { notesUpdated } = useNotes();

    const getTodos = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/todos");
            if (!res.ok) {
                throw new Error("Failed to fetch todos");
            }
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            console.error("Error in fetching todos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodos();
    }, [notesUpdated]);

    const pendingTodos = todos.filter(t => !t.checked);
    const completedTodos = todos.filter(t => t.checked);
    const displayTodos = activeTab === 0 ? pendingTodos : completedTodos;

    // Count stats
    const urgentCount = pendingTodos.filter(t => t.importance === "urgent").length;
    const importantCount = pendingTodos.filter(t => t.importance === "important").length;

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
                        <PlaylistAddCheck sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                            Todos
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage your tasks efficiently
                        </Typography>
                    </Box>
                </Stack>

                {/* Stats chips */}
                {!loading && todos.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Chip
                            label={`${pendingTodos.length} Pending`}
                            size="small"
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                color: "primary.main",
                                fontWeight: 600,
                            }}
                        />
                        <Chip
                            label={`${completedTodos.length} Done`}
                            size="small"
                            sx={{
                                bgcolor: alpha("#10b981", 0.1),
                                color: "#059669",
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
                    </Stack>
                )}
            </Box>

            {/* Tabs for filtering */}
            {!loading && todos.length > 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        overflow: "hidden",
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        sx={{
                            "& .MuiTab-root": {
                                fontWeight: 600,
                                py: 1.5,
                            },
                        }}
                    >
                        <Tab
                            icon={<AccessTime sx={{ fontSize: 20 }} />}
                            iconPosition="start"
                            label={`Pending (${pendingTodos.length})`}
                        />
                        <Tab
                            icon={<CheckCircleOutline sx={{ fontSize: 20 }} />}
                            iconPosition="start"
                            label={`Completed (${completedTodos.length})`}
                        />
                    </Tabs>
                </Paper>
            )}

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
                    <Box sx={{ position: "relative", mb: 3 }}>
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
                        Loading your tasks
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please wait a moment...
                    </Typography>
                </Paper>
            ) : todos.length === 0 ? (
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
                        <CheckCircleOutline sx={{ fontSize: 40, color: "primary.main" }} />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 1 }}>
                        No tasks yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: "center", maxWidth: 300 }}>
                        Start organizing your day by creating your first task.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Click the + button below to get started
                    </Typography>
                </Paper>
            ) : displayTodos.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 8,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
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
                            bgcolor: alpha("#10b981", 0.1),
                            mb: 2,
                        }}
                    >
                        <CheckCircleOutline sx={{ fontSize: 32, color: "#10b981" }} />
                    </Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {activeTab === 0 ? "All caught up!" : "No completed tasks"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {activeTab === 0 ? "You have no pending tasks" : "Complete some tasks to see them here"}
                    </Typography>
                </Paper>
            ) : (
                <Box sx={{ maxWidth: 700, mx: "auto" }}>
                    {displayTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            importance={todo.importance}
                            checked={todo.checked}
                            createdAt={todo.createdAt}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

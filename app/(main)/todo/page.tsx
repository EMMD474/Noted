"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, CircularProgress, Container } from "@mui/material";
import { TodoItem } from "@/components/TodoItem";
import { useNotes } from "@/contexts/NotesProvider";

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

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    Todos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your tasks efficiently.
                </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />

            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {loading ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
                        <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Loading tasks...
                        </Typography>
                    </Box>
                ) : todos.length === 0 ? (
                    <Typography variant="h6" color="text.secondary" sx={{ py: 8 }}>
                        No tasks to display!
                    </Typography>
                ) : (
                    <Box sx={{ width: "100%" }}>
                        {todos.map((todo) => (
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
            </Container>
        </Box>
    );
}

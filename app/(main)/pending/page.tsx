"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, alpha, Chip, Stack } from "@mui/material";
import { TodoItem } from "@/components/TodoItem";
import { useNotes } from "@/contexts/NotesProvider";
import { Schedule, PlaylistAddCheck } from "@mui/icons-material";

interface Todo {
  id: number;
  title: string;
  importance: string;
  checked: boolean;
  createdAt: string;
}

export default function PendingPage() {
  const { notesUpdated } = useNotes();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const getPendingTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/todos/pending");
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    } catch (error) {
      console.error("Failed to fetch pending todos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingTodos();
  }, [notesUpdated]);

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
            bgcolor: alpha("#0ea5e9", 0.1),
            color: "#0ea5e9",
          }}
        >
          <Schedule sx={{ fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
            Pending Tasks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tasks waiting for your action
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
          <CircularProgress size={40} sx={{ color: "#0ea5e9", mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Loading pending tasks...
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
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.02),
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
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              mb: 2,
            }}
          >
            <PlaylistAddCheck sx={{ fontSize: 32, color: "success.main" }} />
          </Box>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, mb: 0.5 }}>
            No pending tasks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Great job! You have no pending tasks.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ maxWidth: 800 }}>
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
    </Box>
  );
}
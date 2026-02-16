"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    TextField,
    Typography,
    Button,
    IconButton,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Stack,
    alpha,
} from "@mui/material";
import { Close, Add, SubjectOutlined, FormatListBulleted, NotificationsActive, Save } from "@mui/icons-material";
import { useNotes } from "@/contexts/NotesProvider";

const modalStyles = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 450 },
    maxWidth: 450,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
};

interface CreateNoteProps {
    open: boolean;
    closeModal: () => void;
    category: string;
    isEditing?: boolean;
    noteId?: number;
    initialData?: {
        title: string;
        content: string;
        importance: string;
    };
}

export const CreateNote: React.FC<CreateNoteProps> = ({
    open,
    closeModal,
    category,
    isEditing = false,
    noteId,
    initialData,
}) => {
    const { setNotesUpdated } = useNotes();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [importance, setImportance] = useState("normal");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ title: "", details: "" });

    useEffect(() => {
        if (open && isEditing && initialData) {
            setTitle(initialData.title);
            setDetails(initialData.content);
            setImportance(initialData.importance);
        } else if (open && !isEditing) {
            resetForm();
        }
    }, [open, isEditing, initialData]);

    const resetForm = () => {
        setTitle("");
        setDetails("");
        setImportance("normal");
        setErrors({ title: "", details: "" });
    };

    const validate = () => {
        const newErrors = { title: "", details: "" };
        let isValid = true;

        if (!title.trim()) {
            newErrors.title = "Title is required";
            isValid = false;
        }
        if (category !== "todo" && !details.trim()) {
            newErrors.details = "Details are required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const endpoint = category === "todo"
                ? (isEditing ? `/api/todos/${noteId}` : "/api/todos")
                : (isEditing ? `/api/notes/${noteId}` : "/api/notes");

            const method = isEditing ? "PUT" : "POST";

            const body = category === "todo"
                ? { title, importance }
                : { title, content: details, importance };

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setNotesUpdated((prev) => !prev);
                if (!isEditing) resetForm();
                closeModal();
            } else {
                console.error(`Failed to ${isEditing ? 'update' : 'create'}`, category);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'}`, category, error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryIcon = () => {
        switch (category) {
            case "todo":
                return <FormatListBulleted sx={{ fontSize: 20 }} />;
            case "reminder":
                return <NotificationsActive sx={{ fontSize: 20 }} />;
            default:
                return <SubjectOutlined sx={{ fontSize: 20 }} />;
        }
    };

    const capital = category.charAt(0).toUpperCase() + category.slice(1);

    const importanceOptions = [
        { value: "normal", label: "Normal", color: "#10b981" },
        { value: "important", label: "Important", color: "#f59e0b" },
        { value: "urgent", label: "Urgent", color: "#ef4444" },
    ];

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={modalStyles}>
                {/* Header */}
                <Box
                    sx={{
                        p: 3,
                        pb: 2,
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: "white",
                    }}
                >
                    <IconButton
                        onClick={closeModal}
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                        }}
                    >
                        <Close />
                    </IconButton>

                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: "rgba(255,255,255,0.15)",
                            }}
                        >
                            {getCategoryIcon()}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {isEditing ? `Edit ${capital}` : `Create ${capital}`}
                        </Typography>
                    </Stack>
                </Box>

                {/* Form */}
                <Box sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label={category === "todo" ? "Task name" : "Title"}
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={!!errors.title}
                            helperText={errors.title}
                            sx={{ mb: 2 }}
                        />

                        {category !== "todo" && (
                            <TextField
                                fullWidth
                                label="Details"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                error={!!errors.details}
                                helperText={errors.details}
                                sx={{ mb: 2 }}
                            />
                        )}

                        <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
                                Priority Level
                            </Typography>
                            <RadioGroup
                                row
                                value={importance}
                                onChange={(e) => setImportance(e.target.value)}
                                sx={{ gap: 1 }}
                            >
                                {importanceOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: option.color,
                                                    "&.Mui-checked": { color: option.color },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: importance === option.value ? 600 : 400,
                                                    color: importance === option.value ? option.color : "text.secondary",
                                                }}
                                            >
                                                {option.label}
                                            </Typography>
                                        }
                                        sx={{
                                            flex: 1,
                                            m: 0,
                                            p: 1,
                                            borderRadius: 2,
                                            border: "1px solid",
                                            borderColor: importance === option.value ? option.color : "divider",
                                            bgcolor: importance === option.value ? alpha(option.color, 0.05) : "transparent",
                                            transition: "all 0.2s",
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            startIcon={isEditing ? <Save /> : <Add />}
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                boxShadow: "0 4px 14px -4px rgba(26, 46, 53, 0.4)",
                                "&:hover": {
                                    boxShadow: "0 6px 20px -4px rgba(26, 46, 53, 0.5)",
                                },
                            }}
                        >
                            {loading ? (isEditing ? "Saving..." : "Creating...") : (isEditing ? "Save Changes" : `Create ${capital}`)}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
};

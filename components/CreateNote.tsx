"use client";

import React, { useState } from "react";
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
    FormLabel,
    Radio,
} from "@mui/material";
import { Close, Create } from "@mui/icons-material";
import { useNotes } from "@/contexts/NotesProvider";

const modalStyles = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 300, sm: 400 },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

interface CreateNoteProps {
    open: boolean;
    closeModal: () => void;
    category: string;
}

export const CreateNote: React.FC<CreateNoteProps> = ({
    open,
    closeModal,
    category,
}) => {
    const { setNotesUpdated } = useNotes();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [importance, setImportance] = useState("normal");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ title: "", details: "" });

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

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const endpoint = category === "todo" ? "/api/todos" : "/api/notes";
            const body = category === "todo"
                ? { title, importance }
                : { title, content: details, importance };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setNotesUpdated((prev) => !prev);
                resetForm();
                closeModal();
            } else {
                console.error("Failed to create", category);
            }
        } catch (error) {
            console.error("Error creating", category, error);
        } finally {
            setLoading(false);
        }
    };

    const capital = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={modalStyles}>
                <IconButton
                    onClick={closeModal}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <Close color="primary" />
                </IconButton>

                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                    Create {capital}
                </Typography>

                <form onSubmit={handleCreate}>
                    <TextField
                        fullWidth
                        label={category === "todo" ? "Todo" : "Title"}
                        variant="outlined"
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                    />

                    {category !== "todo" && (
                        <TextField
                            fullWidth
                            label="Details"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            error={!!errors.details}
                            helperText={errors.details}
                        />
                    )}

                    <FormControl component="fieldset" sx={{ mt: 2, mb: 3 }}>
                        <FormLabel component="legend">Importance</FormLabel>
                        <RadioGroup
                            row
                            value={importance}
                            onChange={(e) => setImportance(e.target.value)}
                        >
                            <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                            <FormControlLabel value="important" control={<Radio />} label="Important" />
                            <FormControlLabel value="urgent" control={<Radio />} label="Urgent" />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        endIcon={<Create />}
                        sx={{ py: 1.5, fontWeight: 600 }}
                    >
                        {loading ? "Creating..." : `Create ${capital}`}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

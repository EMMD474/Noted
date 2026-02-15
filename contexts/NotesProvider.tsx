"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Note {
    id: number;
    title: string;
    content: string;
    importance: string;
    favourite: boolean;
    createdAt: string;
}

interface NotesContextType {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    notesUpdated: boolean;
    setNotesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    getNotes: () => Promise<void>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notesUpdated, setNotesUpdated] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);

    const getNotes = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/notes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Network response was not ok!");
            } else {
                const data = await res.json();
                setNotes(data);
            }
        } catch (err) {
            console.error("Error in fetching notes:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <NotesContext.Provider
            value={{
                notesUpdated,
                setNotesUpdated,
                notes,
                setNotes,
                getNotes,
                loading,
                setLoading,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};

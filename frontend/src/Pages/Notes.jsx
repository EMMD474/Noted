import React, { useEffect, useState } from "react";
import { NoteCard } from "../Components/NoteCard";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthProvider";
import { useNotes } from "../Components/NotesUpdate";
import { WebLoader } from "../Components/WebLoader";

export const Notes = () => {
// const [notes, setNotes] = useState([])
const { notes, getNotes, loading, setLoading } = useNotes()
const { notesUpdated } = useNotes();
const { isLogged, setIsLogged } = useAuth()
const navigate = useNavigate()
const token = sessionStorage.getItem("authToken")

useEffect(() => {
  if (token){
    setIsLogged(true)
  } else {
    navigate("/login")
  }
}, [isLogged])

const handleRefreshToken = async() => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: sessionStorage.getItem('refresh')
      }),
    })
    if (!res.ok) {
      throw new Error("Response was not ok!")
    } else {
      const data = await res.json();
      sessionStorage.setItem('auth', data.access)
    }

  } catch(err) {
    console.log("Error in getting new access token", err)
  }
}

useEffect(() => {
  const interval = setInterval(() => {
    handleRefreshToken();
  }, 300000);

  return () => clearInterval(interval);
}, []);



useEffect(() => {
  getNotes()
}, [notesUpdated])

 
  return (
    <Box sx={{display: 'flex', flexDirection: "column", marginBottom: 5}}>
    <Typography variant="h5" gutterBottom color="primary">
      Notes
    </Typography>
    <Divider sx={{marginBottom: "0.5em"}} />
      {loading ? (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Typography>
            Loading Notes...
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center"}}>
            <WebLoader /> 
          </Box>
        </Box>
      ): notes.length === 0? (
      <Typography variant="body2" color='InfoText'>
        No Notes To Display!
      </Typography>
     ): 
     <Grid container spacing={2} >
     {notes.map(note => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={note['id']} >
        <NoteCard 
        notes={notes}
        title={note['title']} 
        content={note['content']} 
        created_at={note['created_at']} 
        importance={note['importance']}
        id={note['id']}
         />

      </Grid>
     ))}
   </Grid>}

    </Box>



  );
};

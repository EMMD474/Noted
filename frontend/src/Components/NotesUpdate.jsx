import React, { createContext, useContext, useState } from 'react'

// import { useContext, createContext, useState } from 'react'

const NotesContext = createContext();

export const NotesUpdate = ({ children }) => {
  const [ notesUpdated, setNotesUpdated ] = useState(false);
  const [ notes, setNotes ] = useState([])
  const [loading, setLoading] = useState(false)
  const token = sessionStorage.getItem("authToken")


  const getNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/notes/', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      if (!res.ok){
        throw new Error("Network response was not ok!")
      } else {
        const data = await res.json()
        setNotes(data)
      }
    } catch(err) {
      console.log('Error in fetching the requested data', err)
    } finally {
      setLoading(false)
    }
   
  }

  return (
    <NotesContext.Provider value={{ notesUpdated, setNotesUpdated, notes, setNotes, getNotes, loading, setLoading }}>
      {children}
    </NotesContext.Provider>
  )
};

export const useNotes = () => useContext(NotesContext);

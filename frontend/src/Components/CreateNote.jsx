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
import { Close, Create, TimeToLeave } from "@mui/icons-material";
import React, { useState } from "react";
import "../scss/styles.css"
import { useAuth } from "./AuthProvider";
import { useNotes } from "./NotesUpdate";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "whitesmoke",
  borderRadius: "0.3em",
  boxShadow: "0.3em 0.3em 0.3em #222",
  p: 4,
};

export const CreateNote = ({ open, closeModal, category, mobile }) => {
  const [rows, setRows] = useState(1);
  const { setNotesUpdated } = useNotes();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [err, setError] = useState({
    title: false,
    details: false
  })
  const [errorText, setErrorText] = useState({
    title: '',
    details: ''
  })
 const [importance, setImportance] = useState('normal')
 const token = sessionStorage.getItem('authToken');

  const handleFocus = () => setRows(4);
  const handleBlur = () => setRows(1);

  const handleTitleChange = (event) => {
    setTitle(event.currentTarget.value)
    setError({
      title: false,
    })
    setErrorText({
      title: ""
    })
  }
  const handleDetailsChange = (event) => {
    setDetails(event.currentTarget.value)
    setError({
      details: false,
    })
    setErrorText({
      details: ""
    })
    
  }

  const addNote = async() => {
    try{
      const res = await fetch('http://127.0.0.1:8000/notes/', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          content: details,
          importance: importance
        })
      })
      if (!res.ok) {
        throw new Error("Response was not ok!")
      } else {
        const data = await res.json();
        setNotesUpdated(prev => !prev)
        closeModal()
        setTitle("")
        setDetails("")
        setImportance("normal")
      }
    } catch (err) {
      console.log("There was an error in creating note", err)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = {}
    let errorsText = {}

    if(title === "" && details === ""){
      errors.title = true
      errors.details = true
      errorsText.title = "Title Cannot be empty!"
      errorsText.details = "Details Cannot be empty!"
    }
    else if(title === ""){
      errors.title = true
      errorsText.title = "Title Cannot be empty!"

    }
    else if(details === ""){
      errors.title = true
      errorsText.details = "Details Cannot be empty!"

    }
    setError(errors)
    setErrorText(errorsText)
    
    if(Object.keys(errors).length === 0){
      addNote()
    }

  }

  const capital = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={{ ...styles, width: mobile ? 300 : 400 }}>
        <IconButton
          onClick={closeModal}
          sx={{ position: "absolute", top: "0", right: "0" }}
        >
          <Close color="primary" />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom color="primary">
          Create {capital}
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={category === "todo" ? "Todo" : "Title"}
            sx={{ marginBottom: "1em" }}
            onChange={handleTitleChange}
            error={err['title']}
            helperText={errorText['title']}
          />
          {category === "todo" ? (
            ""
          ) : (
            <TextField
              fullWidth
              label="Details"
              sx={{ marginBottom: "1em" }}
              multiline
              rows={rows}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleDetailsChange}
              error={err['details']}
              helperText={errorText['details']}
            />
          )}
          <FormControl>
            <FormLabel>Importance</FormLabel>
            <RadioGroup value={importance} onChange={(e)=> {setImportance(e.target.value)}}>
              <FormControlLabel value='normal' control={<Radio />} label='Normal' />
              <FormControlLabel value='important' control={<Radio />} label='Important' />
              <FormControlLabel value='urgent' control={<Radio />} label='Urgent' />
            </RadioGroup>
          </FormControl>

          <Button type='submit' variant="contained" endIcon={<Create />}>
            Create {capital}
          </Button>
        </form>
      </Box>
    </Modal>

  );
};

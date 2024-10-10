import { Close, DeleteForever, Transform } from '@mui/icons-material'
import { Button, Modal, Paper, Stack, Typography, Box, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from './NotesUpdate'

const styles = {
    position: 'absolute',
    top: '50%',
    left: "50%",
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: "column",
    width: 300,
    minHeight: 200,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgrond: '#fff',

}

export const DeleteModal = ({note, open, close, id}) => {
    const { getNotes, setNotesUpdated } = useNotes()
    const token = sessionStorage.getItem('authToken')
    const navigate = useNavigate()

    const handleDeleteNote = async() => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/notes/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            })
            if (!res.ok) {
                return Error(`Response was not ok: ${res}`)
            } else {
                console.log(`Note with id ${id} deleted successfully.`);
                close();  // Close the modal
                // getNotes()
                setNotesUpdated(prev => !prev)
            }
        } catch (err) {
        console.log(`There was an error in deleting the note: ${err}`)
        }
    }
  return (
    <Modal
    open={open}
    onClose={close}>
        <Box sx={styles}>
            <IconButton sx={{
                position: 'absolute',
                top: 1,
                left: '100%'
            }} onClick={close}>
                <Close sx={{ color: red[500]}} /> 
            </IconButton>
            <Paper sx={{ width: "100%", height: "100%", padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <DeleteForever sx={{ color: 'red', fontSize: '2em', paddingTop: 1 }} />
                <Typography variant="body2">
                    Are you sure you want to delete{' '}
                    <span style={{ color: 'purple', fontWeight: 'bold' }}>
                        {note}
                    </span>{' '}
                    ?
                </Typography>

                <Stack direction={'row'} spacing={1} sx={{ marginTop: 1, paddingBottom: 1}}>
                    <Button variant='outlined' sx={{ color: 'red', borderColor: red[300], '&:hover': {
                        borderColor: red[700]
                    }}} onClick={handleDeleteNote}>
                        Delete
                    </Button>
                    <Button variant='outlined' sx={{ color: 'teal'}} onClick={close}>
                        Cancel
                    </Button>
                </Stack>
            </Paper>
        </Box>
    </Modal>
  )
}

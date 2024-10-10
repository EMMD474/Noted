import { Close, Facebook, Instagram, Person, Telegram, Twitter, WhatsApp, X } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Paper, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'

const styles = {
    position: 'absolute',
    top: '50%',
    left: "50%",
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    minHeight: 100,
    height: 'auto',
    alignItems: "center",
    justifyContent: 'center',
    background: 'whitesmoke',
    borderRadius: '.3em'

}

export const Modals = ({ close, open, details, title }) => {

    const items = [
        {
            name: 'WhatsApp',
            icon: <WhatsApp sx={{color: 'green'}} />
        },
        {
            name: 'Instagram',
            icon: <Instagram sx={{color: 'orange'}} />
        },
        {
            name: 'X',
            icon: <X sx={{color: 'black'}} />
        },
        {
            name: 'Telegram',
            icon: <Telegram sx={{color: 'teal'}} />
        }
    ]
  return (
    <div>
        <Modal
        open={open}
        onClose={close}
        >
            <div >
                <IconButton onClick={close} sx={{
                    position: 'absolute',
                    top: '33%',
                    left: '63%',
                    transform: 'translate(-50%, -50%)',
                }}><Close sx={{color: 'white', transition: '0.3s ease-in', "&:hover": {color: "red"}}} /></IconButton>
                <Box sx={styles}>
                    <Paper sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        width: 300,
                        height: 100,
                        padding: 1,
                        backgroundColor: '#75adad',
                        
                    }}>
                        <Typography variant='h5' gutterBottom color='white'>
                            {title}
                        </Typography>
                        <Box sx={{padding: 1, border: '1px solid', borderRadius: '.3em'}}>
                            <Typography variant='body2' color='black'>
                                {details}
                            </Typography>
                        </Box>
                    </Paper>
                    <Stack direction={'row'} spacing={2} sx={{marginBottom: 1}}>
                        {items.map(item => (
                            <IconButton key={item.name}>
                                <Tooltip title={item.name}>
                                    {item.icon}
                                </Tooltip>
                            </IconButton>
                        ))}
                    </Stack>
                    <Button >Share</Button>
                </Box>
            </div>
        </Modal>
    </div>
  )
}

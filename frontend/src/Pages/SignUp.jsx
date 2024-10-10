import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import '../scss/styles.css'

export const SignUp = () => {
  const tp = document.getElementsByClassName('box')[0]
  const changeColor = () => {
    tp.classList.toggle('change')
  }
  return (
    <div className='div'> 
      <Typography className='tp'>color change!</Typography>
      <Button variant='contained' onClick={() => {changeColor()}}>Change Color</Button>
    </div>
  )
}

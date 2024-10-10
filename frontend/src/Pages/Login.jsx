import { Box, Container } from '@mui/material'
import React, { useState } from 'react'
import { LoginForm } from '../Components/LoginForm'
import { SignForm } from '../Components/SignForm'

export const Login = () => {
  const [login, setLogin] = useState(true)

  const toggleForm = () => {
    setLogin(!login)
  }
  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      height: "100vh",
      alignItems: 'center',
      justifyContent: "center",
      background: "whitesmoke",
    }}>
      {login ? <LoginForm toggle={toggleForm} /> : <SignForm toggle={toggleForm} />}
    </Box>
  )
}

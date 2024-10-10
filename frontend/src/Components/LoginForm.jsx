import { AccountCircle, Lock } from '@mui/icons-material'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { red } from '@mui/material/colors';
import "../scss/styles.css"
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


export const LoginForm = ({ toggle }) => {
  const navigate = useNavigate()
  const { setIsLogged, setToken, setRefreshToken } = useAuth()
  // const [userId, setUserId] = useState("")
  const redColor = red;
  const [focus, setFocus] = useState({
    usr: false,
    psw: false,
  });

  const [err, setError] = useState({
    usr: false,
    psw: false,
  })

  const [input, setInput] = useState({
    usr: "",
    psw: "",
  })

  const login = async() => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.usr,
          password: input.psw
        })
      })
      if (!res.ok){
        throw new Error("Response was not ok")
      } else {
        const data = await res.json();
        sessionStorage.setItem("authToken", data.access)
        sessionStorage.setItem("refresh", data.refresh)
        setIsLogged(true)
        navigate('/')
        console.log("Login")
      }
      
    } catch(err) {
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {}

    if (input.usr === "") {
      errors.usr = true;
    }
    if (input.psw === "") {
      errors.psw = true
    }

    setError(errors)

    if (Object.keys(errors).length === 0) {
      login();
    }
    
  }
  
  const handleFocuse = (field) => {
    setFocus({...focus, [field]: true})
  }

  const handleBlur = (field) => {
    setFocus({...focus, [field]: false})
  }

  const handleChange = (e, name) => {
    const value = e.target.value;
    setInput({...input, [name]: value})
    setError({...err, [name]: false})
  };

  const changeColor = (field) => {
    if (focus[field]) {
      return "teal";
    } else if (input[field] !== "") {
      return "green";
    } else if (err[field]) {
      return redColor[500];
    } else {
      return "#5e8989";
    }
  }

  return (
    <form className='fr' noValidate autoComplete='off' onSubmit={handleSubmit}>
      <Typography variant='h6' color="teal" sx={{
        width: "60%",
        textAlign: "center",
        marginTop: "1em",
      }}>
        Login
      </Typography>
      <Divider sx={{width: "80%"}} />
      <Box sx={{
        width: "80%",
        padding: '1em',
        alignItems: "center",
        justifyContent: "center",

      }}>
      <Box sx={{width: "100%", display: "flex", alignItems: "flex-end", }}>
        <AccountCircle 
          sx={{color: changeColor('usr'), mr: 1, my: 0.5}} 
        />
        <TextField 
          label='Username' 
          variant='standard'
          type='text' 
          fullWidth 
          error={err.usr}
          helperText={err.usr? "Username is empty!": ""}
          onChange={(e) => {handleChange(e, "usr")}}
          onFocus={()=> {handleFocuse("usr")}}
          onBlur={() => {handleBlur('usr')}} />
      </Box>
      <Box sx={{width: "100%", display: "flex", alignItems: "flex-end", }}>
        <Lock sx={{color: changeColor("psw"), mr: 1, my: 0.5}} />
        <TextField 
          label='Password' 
          variant='standard'
          type='password' 
          fullWidth
          error={err.psw}
          helperText={err.psw ? "Password is empty!": ""}
          onChange={(e) => {handleChange(e, "psw")}}
          onFocus={()=> {handleFocuse("psw")}}
          onBlur={() => {handleBlur("psw")}} />
      </Box>
      </Box>
      <Box sx={{
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1em 0 1em",
      }}>
        <Button variant='contained' type='submit'>
          Login
        </Button>
      </Box>
      <Divider sx={{color: 'red', width: "80%", marginTop: 1}} />
      <Box className="links" sx={{
        display: "flex",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5em 1em 1em 1em"
      }}>
        <a href="#">Forgot Password</a>
        <a href="#" onClick={toggle}>Sign Up</a>
      </Box>
    </form>
  )
}

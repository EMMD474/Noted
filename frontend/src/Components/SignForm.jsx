import { AccountCircle, Lock, Mail } from '@mui/icons-material'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import "../scss/styles.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';



export const SignForm = ({ toggle }) => {
  const navigate = useNavigate();
  const redColor = red;
  const [focus, setFocus] = useState({
    usr: false,
    email: false,
    psw: false,
    psw2: false
  });

  const [err, setError] = useState({
    usr: false,
    email: false,
    psw: false,
    psw2: false
  })

  const [input, setInput] = useState({
    usr: "",
    email: "",
    psw: "",
    psw2: ""
  })

  const signUp = async() => {
    try {
      const res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.usr,
          email: input.email,
          password: input.psw2
        })
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Network response was not ok!!")
      } else {
        console.log(data)
      }
    } catch(err) {
      console.log("Error in sending data!", err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {}

    if (input.usr === "") {
      errors.usr = true;
    }
    if (input.email === "") {
      errors.email = true
    }
    if (input.psw === "") {
      errors.psw = true
    }
    if (input.psw2 === "" || input.psw2 !== input.psw) {
      errors.psw2 = true
    }

    setError(errors)

    if (Object.keys(errors).length === 0) {
      signUp()
      navigate('/login')
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
        Sign Up
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
        <Mail sx={{color: changeColor('email'), mr: 1, my: 0.5}} />
        <TextField 
          label='Email'
          variant='standard'
          type='email' 
          fullWidth
          error={err.email}
          helperText={err.email ? "Email is empty!": ""}
          onChange={(e) => {handleChange(e, "email")}}
          onFocus={()=> {handleFocuse("email")}}
          onBlur={() => {handleBlur("email")}} />
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
      <Box sx={{width: "100%", display: "flex", alignItems: "flex-end", }}>
        <Lock sx={{color: changeColor("psw2"), mr: 1, my: 0.5}} />
        <TextField 
          label='Confirm Password' 
          variant='standard'
          type='password' 
          fullWidth
          error={err.psw}
          helperText={err.psw2 ? "Confirm Password is empty!": ""}
          onChange={(e) => {handleChange(e, "psw2")}}
          onFocus={()=> {handleFocuse("psw2")}}
          onBlur={() => {handleBlur("psw2")}} />
      </Box>
      </Box>
      <Box sx={{
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1em 1em 1em",
      }}>
        <Button variant='contained' type='submit'>
          Submit
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
        <a href="#" onClick={toggle}>Already Have an Account, Login</a>
      </Box>
    </form>
  )
}

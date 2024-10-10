import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LayOut } from './Components/LayOut'
import {Notes} from './Pages/Notes'
import { Login } from './Pages/Login'
import { SignUp } from './Pages/SignUp'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {teal, purple} from '@mui/material/colors'
import { Todo } from './Pages/Todo'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from './Components/AuthProvider'
import { Calendar } from './Pages/Calendar'
import { NotesUpdate } from './Components/NotesUpdate'
import { Modals } from './Components/Modals'
import { WebLoader } from './Components/WebLoader'


const theme = createTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: purple[500]
    },
  }
})

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <NotesUpdate>
          <Routes>
            <Route element={<LayOut />}>
              <Route path='/' element={<Notes />} />
              <Route path='/todo' element={<Todo />} />
              <Route path='/calendar' element={<Calendar />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/sign' element={<SignUp />} />
            <Route path='/try' element={<WebLoader />} />
          </Routes>
          </NotesUpdate>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
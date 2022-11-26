import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';



import "../css/SignIn.css";


const theme = createTheme();
const axios = require('axios').default;

const bcrypt = require('bcryptjs');
const saltRounds = 10;

export default function SignInSide() {

  let navigate = useNavigate();
  const [name,setName] = useState('');
  const [password, setPass] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login', {
		username: name,
		password: password
	  })
	  .then(function (response) {
		navigate("/"+ name +"/CineHome");
	  })
	  .catch(function (error) {
		alert("Credenciales incorrectas");
	  });    
  };

  const inputProps = {
    style: { textAlign: 'left' }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div className='singIn'>
          <Box
            sx={{
              my: 11,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography 
              component="h1" 
              variant="h7"
              sx={{ color: 'white' }}>
              ¡Bienvenido a Flippelis!
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                InputProps={{ inputProps }}
                sx={{bgcolor: 'white' }}
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="user"
                label="Nombre de usuario"
                name="user"
                autoComplete="user"
                autoFocus
                onChange={e => setName(e.target.value)}
                />
              <TextField
                InputProps={{ inputProps }}
                sx={{ bgcolor: 'white' }}
                margin="normal"
                variant="filled"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={e => setPass(e.target.value)}
                autoComplete="current-password"
              /> 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={() => navigate('/SignUp')} variant="body2">
                    {"¿No tienes una Flicuenta? ¡Registrate!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          </div>
      </Grid>
    </ThemeProvider>
  );
}

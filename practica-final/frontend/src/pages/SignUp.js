import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/SignUp.css";

const theme = createTheme();
const axios = require('axios').default;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

export default function SignInSide() {

  let navigate = useNavigate();
  const [name,setName] = useState('');
  const [password, setPass] = useState('');
  const [email, setMail] = useState('');
  const [open, setOpen] = React.useState(true);
  const inputProps = {
    style: { textAlign: 'left' }
  };
  
  const handleLeave = () => {
    navigate("/SignIn");
  };

  const handleInfo = () => {
    navigate("/infoExtra");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        axios.post('/api/signup', {
          username: name,
          password: hash,
          email: email,
        })
        .then(function (response) {
          navigate("/SignIn");
        })
        .catch(function (error) {
          alert("El usuario ya existe");
        });
      });
    }); 
    
  };

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div className='signUp'>
          <Box
            sx={{my: 23,mx: 50,}}
          >
            <Typography 
              component="h1" 
              variant="h7"
              sx={{ color: 'white', ml: -36 }}>
              ¡Hazte Fliuser y accede a la aplicación!
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} 
              sx={{ mt: 1, ml: -40, mr: 50}}>
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
               <TextField
                InputProps={{ inputProps }}
                sx={{bgcolor: 'white' }}
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setMail(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 1/3 }}
                onClick={handleLeave}
              >
                Volver
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 27, width: 1/3 }}
              >
                Registrarse
              </Button>
            </Box>
          </Box>
          </div>
          <Dialog open={open}>
            <DialogTitle>Terminos y condiciones de uso</DialogTitle>
            <DialogContent>
            <Typography 
              component="h3" 
              variant="h6"
              color="black">
              Para poder acceder a las funcionalidades de la página web es necesario que aceptes nuestros terminos y condiciones de uso. Por el bien de tu seguridad y del funcionamiento de la aplicación, Flippelis cuenta con una verificación de usuario por correo electrónico, por lo tanto se necesitará almacenar tu dirección de correo, en nuestra base de datos, con el unico fin de poder realizar la verificación y mandarte notificaciones de la app. Al pulsar el boton aceptas por completo estas condiciones.
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleLeave} sx={{ mr: 22}} >Rechazar condiciones</Button>
            <Button onClick={handleInfo}>Más información</Button>
            <Button onClick={handleClose}>Aceptar condiciones</Button>
            </DialogActions>
          </Dialog>
      </Grid>
    </ThemeProvider>
  );
}
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
import "./infoExtra.css";

const theme = createTheme();
const axios = require('axios').default;

export default function InfoExtra() {

  let navigate = useNavigate();
  const [open] = useState(true);
  const inputProps = {
    style: { textAlign: 'left' }
  };
  
  const handleLeave = () => {
    navigate("/SignUp");
  };

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div className='extra'>
          <Box
            sx={{my: 23,mx: 50,}}
          >
            <Dialog open={open} fullWidth
  maxWidth="md" maxHeight="md">
            <DialogTitle>Más información</DialogTitle>
            <DialogContent>
            <Typography 
              component="h3" 
              variant="h7"
              color="black">
              Lea detenidamente las condiciones y terminos de uso de Flippelis:
            </Typography>
            <Typography 
              component="h3" 
              variant="h6"
              color="black">
              Para poder acceder a las funcionalidades de la página web es necesario que aceptes nuestros terminos y condiciones de uso, si las rechazas no podrás acceder al contenido de la aplicación. Por el bien de tu seguridad y del funcionamiento de la aplicación, Flippelis cuenta con una verificación de usuario por correo electrónico, por lo tanto se necesitará almacenar tu dirección de correo en nuestra base de datos, con el unico fin de poder realizar la verificación y mandarte notificaciones de la app. Los datos se almacenan en un servidor europeo y se tratan conforme a el reglamento general de protección de datos. El uso indebido de la aplicación podrá suponer la eliminación inmediata de su cuenta por parte de un administrador si lo considera necesario. Para acceder a la web es necesario introducir correctamente el nombre de usuario y contraseña. Los cuales se comprobará que sean correctos en nuestra base de datos. Tras pulsar el boton de aceptar las condiciones y registrarte podrás iniciar sesión y acceder a la aplicación. En caso de que quiera eliminar su cuenta de usuario podrá llamar gratuitamente al numero 123456789 y uno de nuestros operadores atenderá su petición.
            </Typography>
            <Typography 
              component="h3" 
              variant="h7"
              color="black">
              Para mas información contacte con nosotros en flippelis@gmail.com.
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleLeave} sx={{ mr: 52}} >Volver</Button>
            </DialogActions>
          </Dialog>
          </Box>
          </div>
      </Grid>
    </ThemeProvider>
  );
}
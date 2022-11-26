import "../css/NuevoContenido.css";
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
import { useParams } from 'react-router-dom';
import { borderLeft } from "@mui/system";
import Pelicula from './Pelicula.js';
import { useNavigate } from 'react-router-dom';
import { dialogActionsClasses } from "@mui/material";
import TopMenu from './TopMenu.js';


const axios = require('axios').default;
const theme = createTheme();

export default function NuevoContenido(){
    
    const{user} = useParams();
    const [type, setType] = useState();
    const [film, setFilm] = useState(true); 
    const [serie, setSerie] = useState(false);
    const navigate = useNavigate();
    const [contenido, setContenido] = useState({
        title: null,
        sinopsis: null,
        imageLink: null,
        releaseDate: null,
        characters: null,
        genre: null,
        prizes: null,
        trailer: null,
        producer: null,
        director: null,
        duration: null,
        totalEpisodes: null,
    });

    const inputProps = {
        style: { textAlign: 'left' }
    };

    function handleSubmit (e) {
        e.preventDefault();
        if(contenido.title == null){
            alert("Title can't be null");
            return;
        }
        if(contenido.sinopsis == null){
            alert("Sinopsis can't be null");
            return;
        }
        if(contenido.imageLink == null){
            alert("ImageLink can't be null");
            return;
        }
        if(contenido.genre == null){
            alert("Genre can't be null");
            return;
        }
        if(contenido.duration == null){
            alert("Duration can't be null");
            return;
        }
        axios.post('/api/movies/',{
            title : contenido.title,
            sinopsis : contenido.sinopsis,
            imageLink : contenido.imageLink,
            releaseDate : contenido.releaseDate,
            characters : contenido.characters,
            genre : contenido.genre,
            prizes : contenido.prizes,
            trailer : contenido.trailer,
            producer : contenido.producer,
            director : contenido.director,
            duration : contenido.duration,
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log('Fallo frontend function agregar')
        });
    }
    const handleChange = (event) => {
        setContenido({
            ...contenido,
            [event.target.name]: event.target.value
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline/>
                <div className='page' style={{ minWidth: '100vw'}}>
                    <TopMenu/>
                    <h1>Añade algo flipante {user} </h1>
                    <h2>AÑADIR CONTENIDO </h2>
                    <div className="contenido">
                        <form onSubmit={handleSubmit}>
                            <Grid container direction="row" alignItems="flex-start" spacing={14}
                            style={{ minWidth: '100vw', paddingLeft: '2%', paddingRight: '2%' }}>
                                <Grid container item xs={4} direction="column" alignItems="left">
                                    <Grid item xs={4}>
                                        <h4>Información básica: </h4>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row">
                                        <label>Titulo:</label>
                                        <TextField variant="filled" name="title" onChange={handleChange} placeholder="Title"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Sinopsis:</label>
                                        <TextField variant="filled" name="sinopsis" onChange={handleChange} placeholder="Sinopsis"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                            <label>ImgLink:</label>
                                            <TextField variant="filled" name="imageLink" onChange={handleChange} placeholder="BMP GIF JPG TIF PNG"/>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={4} direction="column">
                                    <Grid item xs={4}>
                                        <h4>Info: </h4>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                            <label>Estreno:</label>
                                            <TextField variant="filled" name="releaseDate" onChange={handleChange} placeholder="AAAA-MM-DD"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Reparto:</label>
                                            <TextField variant="filled" name="characters" onChange={handleChange} placeholder="Characters"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Géneros:</label>
                                            <TextField variant="filled" name="genre" onChange={handleChange} placeholder="Genre"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Premios:</label>
                                            <TextField variant="filled" name="prizes" onChange={handleChange} placeholder="Prizes"/>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={4} direction="column">
                                    <Grid item xs={4}>
                                        <h4>Info Adicional: </h4>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Tráiler:</label>
                                            <TextField variant="filled" name="trailer" onChange={handleChange} placeholder="Trailer"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Duración:</label>
                                            <TextField variant="filled" name="duration" onChange={handleChange} placeholder="120(min)"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Productoras:</label>
                                            <TextField variant="filled" name="producer" onChange={handleChange} placeholder="Producer"/>
                                    </Grid>
                                    <Grid container item xs={4} justifyContent="space-between" direction="row" >
                                        <label>Director:</label>
                                            <TextField variant="filled" name="director" onChange={handleChange} placeholder="Director"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button type = "submit" variant="contained">Add Contenido</Button>
                        </form>
                    </div>
                </div>
            </Grid>
        </ThemeProvider>
    )
}
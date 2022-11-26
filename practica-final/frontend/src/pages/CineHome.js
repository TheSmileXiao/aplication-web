
import "../css/CineHome.css";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { borderLeft } from "@mui/system";
import Pelicula from './Pelicula.js';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import axios from "axios";
import TopMenu from './TopMenu.js';

const theme = createTheme();

export default function CineHome() {

    const{user} = useParams();
    const [movies, setMovies] = useState([]);    
    const [open, setOpen] = useState(false);

    useEffect(searchNew, []);

    function searchNew() {
        axios.get('/api/movies/newest')
        .then(function(res) {
            setMovies(res.data);
        })
        .catch(function (error) {
        });
    }

    const handleClick = () => {
        setOpen(!open);
    };
    
    function genreSelection(genre) {
        axios.get('/api/movies/genre/'+ genre)
        .then(function(res) {
            setMovies(res.data);
            setOpen(!open);
        })
        .catch(function(error) {
            alert(error);
        });
    }
    
    return (
        <div className="page">
            <ThemeProvider theme={theme}>
            <CssBaseline/>
                <TopMenu/>
                <Grid container direction="column">
                    <Grid item xs={12}><h1>Bienvenido a tu cine {user} </h1></Grid>
                    <ListItemButton onClick={handleClick}>
                            <ListItem>Filtrar por género</ListItem>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton> <span onClick={() => genreSelection('Animation')}><b>Animación</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Action')}><b>Acción</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Fantasy')}><b>Fantasía</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Comedy')}><b>Comedia</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Drama')}><b>Drama</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Adventure')}><b>Aventuras</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Crime')}><b>Crimen</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Sci-Fi')}><b>Ciencia Ficción</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Family')}><b>Familiar</b> <Divider/> </span></ListItemButton>
                                    <ListItemButton> <span onClick={() => genreSelection('Horror')}><b>Terror</b> <Divider/> </span></ListItemButton>
                                </List>
                            </Collapse>
                    <Grid item xs={12}><h2>NUEVAS PELICULAS FLIPANTES </h2></Grid>
                    <Grid container justifyContent="flex-start">
                        {movies.map((movie) => 
                        <Grid item xs={2} key={movie._id}>
                            <Pelicula user={user} id={movie._id} image={movie.imageLink} title={movie.title}/>
                        </Grid>
                        )}
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}
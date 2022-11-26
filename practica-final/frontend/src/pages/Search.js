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
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TopMenu from './TopMenu.js';
import Card from '@mui/material/Card';


const theme = createTheme();

export default function CineHome() {

    const{user, title, type} = useParams();
    const [content, setContent] = useState([]);
    const [notFound, setNotFound] = useState('');
    const inputProps = {
        style: { textAlign: 'left' }
    };

    useEffect(init, []);

    function init() {
        if(type === 'movie') {
            axios.get('/api/movies/title/'+ title)
            .then(function(res) {
                setContent(res.data);
                if(res.data.length == 0) {
                    setNotFound('No hay resultados para la búsqueda');
                }else {
                    setNotFound('');
                }
                
            })
            .catch(function (error) {
            });
        }
    }

    return (
        <div className="page">
            <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <TopMenu setContent={setContent} setNotFound={setNotFound}/>
                </Grid>
                <Grid container direction="column">
                    <Grid item xs={12}><h2>FLIPANTES RESULTADOS DE LA BUSQUEDA </h2></Grid>
                    <h1 style={{ textAlign: 'center' }}>{notFound}</h1>
                    <Grid container justifyContent="flex-start">
                        {content.map((cont) => 
                        <Grid item xs={2} key={cont._id}>
                            <Pelicula user={user} id={cont._id} image={cont.imageLink} title={cont.title}/>
                        </Grid>
                        )}
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}
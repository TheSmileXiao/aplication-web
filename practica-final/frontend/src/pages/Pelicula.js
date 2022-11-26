import "../css/Pelicula.css";
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
import { useParams, useNavigate } from 'react-router-dom';
import { CardMedia } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const theme = createTheme();

export default function Pelicula(props) {

    const navigate = useNavigate();

    return(
        <ThemeProvider theme={theme}>
            <div className='image-container' >
                <Card sx={{
                    bgcolor: "rgb(27, 27, 27)",
                    width: 250,
                    height: 450,
                    marginLeft: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    }} variant="filled">
                    <CardMedia
                        component="img"
                        alt={props.title}
                        width="250"
                        height="380"
                        image={props.image}
                        onClick={()=> navigate("/"+ props.user +"/movie/" + props.id)}
                    />
                    <h5>{props.title}</h5>
                </Card>
            </div>
        </ThemeProvider>
    )
}
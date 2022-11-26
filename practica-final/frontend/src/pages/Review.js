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
import { useParams, useNavigate } from 'react-router-dom';
import { CardMedia } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete'
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider';
import axios from "axios";

const theme = createTheme();

export default function Review(props) {

    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [rate, setRate] = useState(props.review.reviewRate);

    const StyledRating = styled(Rating)({

        '& .MuiRating-iconEmpty':{
            color: '#fafafa',
        },
        '& .MuiRating-iconFilled': {
          color: '#000000',
        },
        '& .MuiRating-iconHover': {
          color: '#00000',
        },
    });

    useEffect(handleInit, []);

    function handleInit() {
        axios.get('/api/users/'+ props.user)
        .then(function(res) {
            props.review.rates.map((rate) => {
                console.log(rate);
                if(rate.user === res.data._id) {
                    if(rate.rate == 1) {
                        setLike(1);
                    }else if(rate.rate == -1) {
                        setDislike(1);
                    }
                }
            });
        })
    }

    function handleLike(e, newVal) {
        var rateVal = 0;
        if(newVal != null) {
            if(dislike == null || dislike == 0) {
                setRate(rate + 1);
            }else {
                console.log(dislike);
                setRate(rate + 2);
            }
            rateVal = 1;
        }else {
            setRate(rate - 1);
        }
        axios.put('/api/reviews/'+ props.review._id, {
            user: props.user,
            rate: rateVal,
        })
        .then(function(res) {
            setLike(newVal);
            setDislike(0);
        })
        .catch(function(error) {
            alert("No se ha podido valorar la reseña");
        })
    }

    function handleDislike(e, newVal) {
        var rateVal = 0;
        if(newVal != null) {
            if(like == null || like == 0) {
                setRate(rate - 1);
            }else {
                setRate(rate - 2);
            }
            rateVal = -1;
        }else {
            setRate(rate + 1);
        }
        axios.put('/api/reviews/'+ props.review._id, {
            user: props.user,
            rate: rateVal,
        })
        .then(function(res) {
            setDislike(newVal);
            setLike(0);
        })
        .catch(function(error) {
            alert("No se ha podido valorar la reseña");
        })
    }

    return(
        <ThemeProvider theme={theme}>
            <Card sx={{ bgcolor: "rgb(31, 61, 117)"}} variant="outlined" >
                <Grid container justifyContent="space-around">
                    <Grid item xs={4}><h4 style={{ textAlign: "left" }}>{props.review.author}</h4></Grid>
                    <Grid item xs={4}><h4>{rate}</h4></Grid>
                </Grid>
                <Divider variant="middle" textAlign="right"/>
                <h5 style={{ textAlign:"left", paddingLeft: 10, paddingRight: 10 }}>{props.review.comment}</h5>
                <Grid container direction="row" alignItems="space-around" justifyContent="center" spacing={0}>
                    <StyledRating 
                    //BOTON DE ELIMINAR
                        sx={{ mt: 0, mb: 2, ml: -5, visibility: props.admin }}
                        defaultValue={0} max={1}
                        getLabelText={(value) => `${value} Trash${value !== 1 ? 's' : ''}`}
                        icon={<DeleteIcon fontSize="medium" text-align= "center"/>}
                        emptyIcon={<DeleteIcon fontSize="medium" text-align= "center"/>}
                        onClick={() => props.handleDelete(props.review._id)}
                    />
                    <StyledRating 
                    //BOTON DE LIKE
                        sx={{ mt: 0, mb: 2, ml: 0 }}
                        defaultValue={0} max={1}
                        getLabelText={(value) => `${value} Like${value !== 1 ? 's' : ''}`}
                        icon={<ThumbUpIcon fontSize="medium" text-align= "center"/>}
                        emptyIcon={<ThumbUpIcon fontSize="medium" text-align= "center"/>}
                        onChange={(event, newValue) => handleLike(event, newValue)} 
                        value = {like}
                    />
                    <StyledRating 
                    //BOTON DE DISLIKE
                        sx={{mt: 0, mb: 2, ml: 0}}
                        defaultValue={0} max={1}
                        getLabelText={(value) => `${value} Dislike${value !== 1 ? 's' : ''}`}
                        icon={<ThumbDownAltIcon fontSize="medium" text-align= "center"/>}
                        emptyIcon={<ThumbDownAltIcon fontSize="medium" text-align= "center"/>}
                        onChange={(event, newValue) => handleDislike(event, newValue)} 
                        value = {dislike}
                    />
                </Grid>
            </Card>
        </ThemeProvider>
    )
}
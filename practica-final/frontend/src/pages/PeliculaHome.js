import "../css/PeliculaHome.css";
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
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { borderLeft } from "@mui/system";
import Pelicula from './Pelicula.js';
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TopMenu from './TopMenu.js';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Review from './Review';
import HistoryIcon from '@mui/icons-material/History';


const theme = createTheme();

export default function PeliculaHome(){
    
    const{user, pelicula} = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [rate, setRate] = useState(0);
    const [fav, setFav] = useState(0);
    const [pend, setPend] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [rateTotal, setRateTotal] = useState(0);
    const [admin, setAdmin] = useState('hidden');

    const StyledRating = styled(Rating)({

        '& .MuiRating-iconEmpty':{
            color: '#fafafa',
        },
        '& .MuiRating-iconFilled': {
          color: '#1876D3',
        },
        '& .MuiRating-iconHover': {
          color: '#1876D3',
        },
    });

    const handleClick = () => {
        setOpen(!open);
    };


    const [movie, setMovie] = useState({
        title: "",
        sinopsis: "",
        imageLink: "",
        rates: [],
        rateTotal: 0,
        info: {
            releaseDate: "",
            characters: "",
            genre: "",
            prizes: "",
            trailer: "",
            producer: "",
            director: "",
        },
        duration: 0,
    });

    function handleInit() {
        //Obtener informacion de la pelicula
        let isFav = false;
        let isPend = false;

        console.log("HOLA");

        axios.get('/api/movies/id/' + pelicula)
        .then(function(response) {
            axios.get('/api/favMoviesList/'+ user)
            .then(function(res) {
                res.data.map((mov) => {
                    if(mov._id === response.data._id) {
                        isFav = true;
                    }
                });
                if(isFav) {
                    setFav(1);
                }
            })
            

            axios.get('/api/moviesToWatch/'+ user)
            .then(function(res) {
                res.data.map((mov) => {
                    if(mov._id === response.data._id) {
                        isPend = true;
                    }
                });
                if(isPend) {
                    setPend(1);
                }
            })
            setMovie(response.data);
            setRateTotal(response.data.rateTotal);

            var punt = axios.get('/api/movies/rate/' + user + '/' + pelicula)
            .then(function(res){
                console.log(res.data);
                if(res.data.length === 1){
                    setRate(res.data[0].rate);
                }
            })
            console.log(punt);
        })
        .catch(function (error) {
            alert(error);
            navigate('/');
        });


        axios.get('/api/users/type/'+ user)
        .then(function(res){
            if(res.data.type == 1) {
                setAdmin('visible');
            }
        })
        .catch(function(error) {
            console.log(error)
        });

        //Obtener reseñas de la pelicula
        updateReviews();
    }

    function updateReviews() {
        axios.get('/api/reviews/' + pelicula)
        .then(function(response) {
            setReviews(response.data);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    useEffect(handleInit, []);

    function handleFav(event, newValue) {
        
        if(newValue == null) {
            axios.put('/api/favMoviesList/'+ user, {
                data: {
                    movieId: pelicula,
                }
            })
            .then(function(res) {
                setFav(newValue);
            })
            .catch(function(error) {
                alert("No se ha podido eliminar de favoritos");
            })
        }else {
            axios.post('/api/favMoviesList/'+ user, {
                movieId: pelicula,
            }) 
            .then(function(res) {
                setFav(newValue);
            })
            .catch(function(error) {

            });
        }
    }

    function handleReviewText(e) {
        setComment(e.target.value);
    }

    function handlePending(event, newValue) {
        console.log(newValue);
        if(newValue == null) {
            axios.put('/api/moviesToWatch/'+ user, {
                data:{
                    movieId: pelicula,
                }
            })
            .then(function(res) {
                setPend(newValue);
            })
            .catch(function(error) {
                alert("No se ha podido eliminar de pendientes");
            })
        }else {
            axios.post('/api/moviesToWatch/'+ user, {
                movieId: pelicula,
            }) 
            .then(function(res) {
                setPend(newValue);
            })
            .catch(function(error) {

            });
        }
    }

    function handleReviewText(e) {
        setComment(e.target.value);
    }

    function changeRate(newValue) {
        setRate(newValue);

        if(newValue == null){
            axios.delete('/api/movies/rate/'+ user, {
                data:{
                    movieId: pelicula,
                }
            })
            .then(function (res) {
                setRateTotal(res.data.rateTotal);
            })
            .catch(function(error) {
                alert("No se ha podido eliminar la puntuación");
            })
        }
        else{
            axios.post('/api/movies/rate/'+ user, {
                movieId: pelicula,
                rate: newValue
            }) 
            .then(function (res) {
                setRateTotal(res.data.rateTotal);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }

    function handleSendReview() {
        if(comment.trim().length != 0) {
            if(comment.trim().length > 300) {
                alert('Reseña demasiado larga');
            }else {
                axios.post('/api/reviews/'+ pelicula, {
                    user: user,
                    text: comment
                })
                .then(function (res) {
                    updateReviews();
                    setComment('');
                })
                .catch(function(error) {
                    alert('No puede introducir mas de una reseña');
                    setComment('');
                })
            }
        }else {
            alert('No puede guardar una reseña vacía');
        }
    }

    function handleDeleteReview(id) {
        axios.delete('/api/reviews/'+ id)
        .then(function(res) {
            setReviews(reviews.filter(rev => rev._id != id));
        })
        .catch(function(error) {
            alert(error);
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="page">
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <TopMenu/>
                </Grid >
                <Grid container direction="row" alignItems="flex-start" justify-content="space-evenly" spacing={0}>
                    <Grid container item xs={4} direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <img src={movie.imageLink} 
                                //Incluir link de la imagen de la bd
                                alt=""
                                height = "475"
                                width = "320"
                                text-align= "center"
                                border-radius= "50%"
                                >
                            </img>
                        </Grid>
                        <Grid item>
                            <StyledRating
                                    sx={{ mt: 3, ml: '-3.2rem' }}
                                    name="simple-controlled"
                                    value={rate}
                                    onChange={(event, newValue) => {
                                        changeRate(newValue);
                                    }}
                            />
                        </Grid>
                        <Grid item container xs={4} direction="row" justifyContent="center">
                            <Grid item>
                            <StyledRating 
                                sx={{ mt: 3, ml: '-3.2rem' }}
                                name="customized-color"
                                defaultValue={0} max={1}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                icon={<FavoriteIcon fontSize="medium" text-align= "center"/>}
                                emptyIcon={<FavoriteBorderIcon fontSize="small" />}
                                value={fav}
                                onChange={(event, newValue) => handleFav(event, newValue)}  
                            />
                            </Grid>
                            <Grid item>
                            <StyledRating 
                                sx={{mt: 3, ml: '-1.0rem' }}
                                name="pending"
                                color="white"
                                defaultValue={0} max={1}
                                getLabelText={(value) => `${value} History${value !== 1 ? 's' : ''}`}
                                icon={<HistoryIcon fontSize="medium" text-align= "center"/>}
                                emptyIcon={<HistoryIcon fontSize="medium" text-align= "center"/>}
                                value={pend}
                                onChange={(event, newValue2) => handlePending(event, newValue2)}  
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <List>
                            <ListItem> <h3>{movie.title}</h3> </ListItem>
                            <ListItem> {movie.sinopsis} </ListItem>
                            <ListItem>
                                <Grid item>
                                <h3>Flíppate un poco, haz una reseña!</h3>
                                </Grid>
                            </ListItem>
                            <ListItem>
                            <Grid item>
                                <TextareaAutosize
                                    value={comment}
                                    aria-label="empty textarea"
                                    placeholder="Deje su reseña"
                                    style={{ width: 470 }}
                                    onChange={handleReviewText}
                                />
                            </Grid>
                            </ListItem>
                            <ListItem>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: 470 }} 
                                onClick={handleSendReview}
                                >
                                Guardar Reseña
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid container item xs={4} direction="column" alignItems="center">
                            <ListItemButton onClick={handleClick}>
                            <ListItem>Ficha técnica</ListItem>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem> <span><b>Actores</b> <Divider/> {movie.info.characters}</span></ListItem>
                                    <ListItem> <span><b>Géneros</b> <Divider/> {movie.info.genre}</span></ListItem>
                                    <ListItem> <span><b>Premios</b> <Divider/> {movie.info.prizes}</span></ListItem>
                                    <ListItem> <span><b>Trailer</b> <Divider/> <a href={movie.info.trailer} target="_blank">Link</a></span></ListItem>
                                    <ListItem> <span><b>Productor</b> <Divider/> {movie.info.producer}</span></ListItem>
                                    <ListItem> <span><b>Director</b> <Divider/> {movie.info.director}</span></ListItem>
                                </List>
                            </Collapse>
                            <ListItem>
                                <span><b>Puntuación</b> <Divider/> {rateTotal}</span>
                            </ListItem>
                    </Grid>
                </Grid>
                <h3>Opiniones de otros usuarios:</h3>
                <Grid container direction="row" justifyContent="flex-start" columns="12" spacing={2} sx={{ padding: "2%" }}>
                    {reviews.map((rev) => 
                    <Grid item xs={2} key={rev._id}>
                        <Review review={rev} admin={admin} user={user} handleDelete={handleDeleteReview}/>
                    </Grid>
                    )}
                </Grid>
            </div>
        </ThemeProvider>
    )
}
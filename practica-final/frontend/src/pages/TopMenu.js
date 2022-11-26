import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState, useContext, useEffect } from 'react';
import axios from "axios";

export default function TopMenu(props) {

    const navigate = useNavigate();
    const {user} = useParams();
    const [search, setSearch] = useState('');
    const [admin, setAdmin] = useState('hidden');
    const inputProps = {
        style: { textAlign: 'left' }
    };

    useEffect(init, []);

    function init() {
        axios.get('/api/users/type/'+ user)
        .then(function(res){
            if(res.data.type == 1) {
                setAdmin('visible');
            }
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    function handleSearch(event) {
        event.preventDefault();
        if(search.trim().length != 0) {
            navigate("/"+ user + "/search/title/movie/"+ search);
            axios.get('/api/movies/title/'+ search)
            .then(function(res) {
                props.setContent(res.data);
                if(res.data.length == 0) {
                    props.setNotFound('No hay resultados para la búsqueda');
                }else {
                    props.setNotFound('');
                }
            })
            .catch(function (error) {
            });
        }
    }

    return (
        <div className='topBar'>
            <img
            src="https://i.ibb.co/tJ6pZq2/Flippelis.png"
            alt=""
            height = "75px"
            width = "75px"
            onClick={() => navigate("/" + user + "/CineHome")}
            />
            <Box className="searchBar" component="form" onSubmit={handleSearch}>
                <TextField
                InputProps={{ inputProps }}
                sx={{bgcolor: 'white', borderRadius: 3, ml: 5, width: '100%' }}
                variant="filled"
                label="Busca y encontrarás"
                type="search"
                onChange={(e) => {setSearch(e.target.value)}}
                />
            </Box>
            <span style={{ visibility: admin }} onClick={() =>navigate('/'+ user + '/NuevoContenido')}>Añadir contenido</span>
            <span onClick={() =>{navigate("/" + user + "/CineHome")} }>Inicio</span>
            <span onClick={() => navigate("/" + user + "/list/favMoviesList")}>Favoritas</span>
            <span onClick={() => navigate("/" + user + "/list/moviesToWatch")}>Pendientes</span>
            <span onClick={() => navigate("/" + user + "/list/MostRated")}>Most Rated</span>
            <span onClick={() => navigate("/SignIn")}>Cerrar sesión</span>
        </div>
    )
}
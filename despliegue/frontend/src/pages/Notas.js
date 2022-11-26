import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import '../css/Notas.css';
import {user} from './Login';
import { render } from 'react-dom';
const axios = require('axios').default;

let title, content;
var userNotes = [];
var id;
function Nota(id, title, content){
    this.id = id;
    this.title = title;
    this.content = content;
}

function Notas() {
    const [open, setOpen] = useState(false);
    const [notas, setNotas] = useState([]);
    const [currentData, setCurrentData] = useState({currentID: null, currentContent: null, currentTitle: null});
//    const [readed, setReaded] = useState(false);

    function readData(){
        axios.get('/api/'+ user +'/notes')
        .then(function (response) {
        // handle success
            userNotes = response.data;
            for(let i = 0; i < userNotes.length; i++){
                var nota = new Nota(userNotes[i]._id, userNotes[i].title, userNotes[i].content);
                notas.push(nota);
            }
            setNotas([...notas]);
            console.log(notas);
        })
        .catch(function (error) {
        // handle error
        alert("No response.")
        console.log(error);
        });
    }
    useEffect(() =>{
        readData(); 
    }, []);

    const changeTitle = (event) =>{
        title = event.target.value;
    }
    const changeContent = (event) =>{
        content = event.target.value;
    }
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        if(currentData.currentID === null) {
            axios.post('/api/'+user+'/notes', {
                'title': title, 
                'content': content
            })
            .then(function (response) {
                // handle success
                    id = response.data._id;
                    var nota=new Nota(id,title,content);
                    title = null;
                    content = null;
                    setNotas([...notas, nota]);
                    console.log("add obj id:" + nota.id +'title: ' + nota.title);
                })
            .catch(function (error) {
                // handle error
                alert("No response.")
                console.log(error);
            });
        }else{
            for(let i = 0; i < notas.length; i++){
                if(notas[i].id === currentData.currentID){
                    notas[i].title = title;
                    notas[i].content = content;
                    
                    axios.put('/api/'+user+'/notes/'+id, {
                        'title': title, 
                        'content': content
                    })
                    
                    console.log("Modificar nota id:"+ notas[i].id + ' titile:' + notas[i].title);
                }
            }
        }
        currentData.currentID = null;
        currentData.currentTitle = null;
        currentData.currentContent = null;
        setCurrentData(currentData);

        setOpen(false);

    }

    const closeCancel = () => {
        currentData.currentID = null;
        currentData.currentTitle = null;
        currentData.currentContent = null;
        setCurrentData(currentData);
        setOpen(false);
    }

    const editarCard = (element) =>{
        id = element.id;
        title = element.title;
        content = element.content;
        currentData.currentID = element.id;
        currentData.currentTitle = element.title;
        currentData.currentContent = element.content;
        setCurrentData(currentData);
        setOpen(true);
    }

    const eliminarCard = (element) =>{
        id = element.id;
        var newNotas = notas.filter(function (e){
            return e.id !== id;
        });

        axios.delete('/api/'+user+'/notes/'+id);
        setNotas(newNotas);
        console.log("eliminar nota id:"+ id + ' titile:' + element.title);

    }

    return(
        <div className='containerPrincipal'>     
            <Button variant="contained" onClick={handleClickOpen}>Add Note</Button>
            <br/>
            <br/>
            <Grid container spacing={4}>
                {notas.map(element =>
                    (<Grid item xs={4} key={element.id}>
                        <Card>
                            <CardContent>
                                <h5>Title: {element.title}</h5>
                                <p>Content: {element.content}</p>
                            </CardContent>
                            <CardActions>
                                    <Button variant='contained' onClick={()=> editarCard(element)}>Edit</Button>
                                    <Button variant='outlined' onClick={()=> eliminarCard(element)}>Remove</Button>
                            </CardActions>
                        </Card>
                    </Grid>)
                )}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Notas</DialogTitle>
                <DialogContent>
                    <form>
                        <label for="Title:">Title: </label>
                        <input type="text" id="title" name="title" placeholder={currentData.currentTitle} onChange={changeTitle}></input>
                        <br/>
                        <label for="content">Content: </label>  
                        <input type="text" id="content" name = "content" placeholder={currentData.currentContent} onChange={changeContent}></input>
                        <br/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCancel}>Cancel</Button>
                    <Button onClick={handleClose}>OK</Button>      
                </DialogActions>
            </Dialog>

        </div>
    );
}


export default Notas;

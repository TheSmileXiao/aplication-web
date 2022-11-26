import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom'

function App() {

  const[count, setCount] = useState(0);
  const[nombre, setNombre] = useState("Xiao Yang");
  const[text, setText] = useState("color de esta línea debe cambiar a rojo después de 5 segundos, y debe cambiar el texto a : Ha cambiado!");
  const[textColor, setTextColor] = useState('white');
  const[colorLeft, setColorLeft] = useState('dodgerblue');
  const[colorRight, setColorRight] = useState('darkgrey');
  const[visible, setVisible] = useState('visible');
  const[edad, setEdad] = useState('');

  let changeName = (event) =>{
    setNombre(event.target.value)
  }

  let calculaEdad = (event) =>{
    var today = new Date();
    var birthDate = new Date(event.target.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    setEdad(age);
  }

  let changeVisivility=()=>{
    if(visible == 'visible')
      setVisible('hidden');
    else
      setVisible('visible');
  }

  let changeBackColor=(event)=>{
    setColorRight(event.target.value);
  }

  useEffect(() => {
    setTimeout(() => {
      setText("Ha cambiado!")
      setTextColor("red");
    }, 5000);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src="http://sso.unileon.es/themes/unileon-metronic/img/main-title.png" 
          className="titleImg" alt="imagen inicio unileon" 
          onClick={() => setCount(count+1)}
          style={{visibility:visible}}
        />
        <h1>Ejercicio 2 de "{nombre}"</h1>
        <div className = "container">
          <div className="split left" id="divLeft" style={{background:colorLeft}}>
            <h2>Instrucciones ejercicio 2:</h2>
            <p>Debes replicar este ejercicio en tres ficheros:</p>
            <ul>
              <li>Fichero index.html con el código HTML, es necesario para replicar este mismo contenido</li>
              <li>Fichero style.css con el código CSS necesario para dar estilo al ejercicio</li>
              <li>Fichero myscript.js con el código JS necesario para permitir al usuario interactuar con la web</li>
            </ul>
            <p>Además, debes cumplir los siguientes puntos:</p>
            <ul>
              <li>Utilizar GitHub Classroom para depositar el código fuente</li>
              <li>Modificar el encabezado del ejercicio con tu nombre</li>
              <li style = {{color:textColor}}>{text}</li>
              <li>Contador de clicks en la imagen: {count}</li>
            </ul>
          </div>
        
          <div className="split right" id="divRight" style={{background:colorRight}}>
            <h2>Formulario</h2>
            <form action="">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" onChange={changeName}></input>
              <br/>

              <label for="FechaNacimiento">Fecha de nacimiento:</label>
              <input type="date" id="FechaNacimiento" name="FechaNacimiento" value="dd/mm/aaaa" className="inpuFechaNac" onInput={calculaEdad}></input>
              <br/>

              <label for="edad">Edad:</label>
              <input type="text" id="edad" name="edad" className="inputEdad" disabled value={edad}></input>
              <br/>

              <label for="text">Sexo:</label>
              <input type="radio" id="hombre" name="sexo" value="Hombre" onClick={()=>setColorLeft("red")}></input>
              <label for="hombre">Hombre</label>
              <br/>
              <label for="text">     </label>    
              <input type="radio" id="mujer" name="sexo" value="  " onClick={()=>setColorLeft("green")}></input>
              <label for="mujer">Mujer</label>
              <br/>

              <label for="text">Conoce HTML5:</label>
              <input type="checkbox" id="conoceHTML" name="conoceHTML" value="conoceHTML" onClick={changeVisivility}></input>
              <br/>

              <label for="Color">Color favorito:</label>
              <input type="color" id="color" name="color" value="#000000" onChange={changeBackColor}></input>
              <br/>

              <label for="Foto">Foto:</label>
              <input type="file" name="file" id="file"></input>
              <br/>

              <input type="submit" value="Enviar" onclick="enviar()"></input>
              
            </form>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
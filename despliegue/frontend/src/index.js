import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';

import Login from './pages/Login'
import Notas from './pages/Notas'

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "Notas" element = {<Notas />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
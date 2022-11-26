import './App.css';
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import InfoExtra from './pages/InfoExtra.js';
import CineHome from "./pages/CineHome.js"
import Pelicula from "./pages/Pelicula.js"
import NuevoContenido from "./pages/NuevoContenido.js"
import PeliculaHome from "./pages/PeliculaHome.js"
import Search from './pages/Search.js';
import Lists from './pages/Lists.js';

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
       <Routes>
          <Route path="/" element={<Navigate to= "/SignIn" />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/InfoExtra" element={<InfoExtra/>} />
          <Route path="/:user/CineHome" element={<CineHome />} />
          <Route path="/:user/movie/:pelicula" element={<PeliculaHome />} />
          <Route path="/:user/NuevoContenido" element={<NuevoContenido />} />
          <Route path="/:user/search/title/:type/:title" element={<Search />} />
          <Route path="/:user/list/:list" element={<Lists />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

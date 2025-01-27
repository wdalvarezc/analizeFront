import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/Home";
import Proyect from "./components/Proyects";
import Tasks from "./components/Tasks";
import FormTask from "./components/FormTask";
import FormUser from "./components/FormUser";
import User from "./components/User";
import Appbar from "./components/Appbar";
import Teams from "./components/Teams";
import FormTeams from "./components/FormTeams";
import AlertAsign from "./components/AlertAsign";
import FormProyects from "./components/FormProyects";
import FormTeamAsign from "./components/FormTeamAsign";
import FormAsignProyecTeam from "./components/FormAsignProyecTeam";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Appbar />
          <Routes>
            <Route path="/analizeFront/" element={<Home />} />
            <Route path="/analizeFront/proyectos" element={<Proyect />} />
            <Route path="/analizeFront/proyectosEquipos" element={<FormAsignProyecTeam />} />
            <Route path="/analizeFront/details" element={<Tasks />} />
            <Route path="/analizeFront/crearTarea" element={<FormTask />} />
            <Route path="/analizeFront/crearUsuario" element={<FormUser />} />
            <Route path="/analizeFront/usuarios" element={<User />} />
            <Route path="/analizeFrontR/equipos" element={<Teams />} />
            <Route path="/analizeFront/crearEquipos" element={<FormTeams />} />
            <Route path="/analizeFront/asignarEquipos" element={<FormTeamAsign />} />
            <Route path="/analizeFront/crearProyectos" element={<FormProyects />} />
            <Route path="/analizeFront/asignarTarea" element={<AlertAsign />} />
          </Routes>
      </Router>
    </Provider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
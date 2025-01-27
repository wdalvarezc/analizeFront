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
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Proyect />} />
            <Route path="/proyectosEquipos" element={<FormAsignProyecTeam />} />
            <Route path="/details" element={<Tasks />} />
            <Route path="/crearTarea" element={<FormTask />} />
            <Route path="/crearUsuario" element={<FormUser />} />
            <Route path="/usuarios" element={<User />} />
            <Route path="/equipos" element={<Teams />} />
            <Route path="/crearEquipos" element={<FormTeams />} />
            <Route path="/asignarEquipos" element={<FormTeamAsign />} />
            <Route path="/crearProyectos" element={<FormProyects />} />
            <Route path="/asignarTarea" element={<AlertAsign />} />
          </Routes>
      </Router>
    </Provider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
import axios from "axios";

// Acción para iniciar la carga de los datos
const fetchDataStart = () => ({
  type: "FETCH_DATA_START",
});

// Acción para manejar el éxito de la API
const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

const fetchDataTask = (data) => ({
  type: "FETCH_DATA_TASK",
  payload: data,
});

const fetchDataTeams = (data) => ({
  type: "FETCH_DATA_TEAMS",
  payload: data,
});

const fetchDataUsers = (data) => ({
  type: "FETCH_DATA_USERS",
  payload: data,
});

const fetchDataTaskActive = (data) => ({
  type: "FETCH_DATA_TASK_ACTIVE",
  payload: data,
});
// Acción para manejar el error de la API
const fetchDataError = (error) => ({
  type: "FETCH_DATA_ERROR",
  payload: error,
});

// Acción asíncrona para hacer el llamado a la API
export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataStart()); // Despachamos la acción de inicio

    axios
      .get("http://localhost:3001/api/proyectos") // Usamos una API de ejemplo
      .then((response) => {
        dispatch(fetchDataSuccess(response.data)); // Despachamos el éxito
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message)); // Despachamos el error
      });
  };
};
// Acción asíncrona para hacer el llamado a la API
export const fetchTask = () => {
  return (dispatch) => {
    dispatch(fetchDataStart()); // Despachamos la acción de inicio

    axios
      .get("http://localhost:3001/api/tareas") // Usamos una API de ejemplo
      .then((response) => {
        dispatch(fetchDataSuccess(response.data)); // Despachamos el éxito
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message)); // Despachamos el error
      });
  };
};


export const fetchProyect = (idproyect) => {
  console.log(idproyect)
  return (dispatch) => {
    dispatch(fetchDataStart()); // Despachamos la acción de inicio

    axios
      .get(`http://localhost:3001/api/proyectos/${idproyect}`) // Usamos una API de ejemplo
      .then((response) => {
        console.log(response)
        dispatch(fetchDataTask(response.data.Tasks)); // Despachamos el éxito
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message)); // Despachamos el error
      });
  };
};

export const fetchTeams = () => {
  return (dispatch) => {
    dispatch(fetchDataStart()); // Despachamos la acción de inicio

    axios
      .get(`http://localhost:3001/api/equipos`) // Usamos una API de ejemplo
      .then((response) => {
        console.log(response)
        dispatch(fetchDataTeams(response.data.Tasks)); // Despachamos el éxito
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message)); // Despachamos el error
      });
  };
};


export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchDataStart()); // Despachamos la acción de inicio

    axios
      .get(`http://localhost:3001/api/usuarios`) // Usamos una API de ejemplo
      .then((response) => {
        dispatch(fetchDataUsers(response.data)); // Despachamos el éxito
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message)); // Despachamos el error
      });
  };
};
export const fetchActiveTask = (id) => {
  return (dispatch) => {
    dispatch(fetchDataStart()); // Despachamos la acción de inicio
    dispatch(fetchDataTaskActive(id));
  };
};


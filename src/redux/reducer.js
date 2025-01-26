const initialState = {
    tasks: [],
    proyects: [],
    teams: [],
    users:[],
    taskActive:{},
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DATA_START":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                loading: false,
                proyects: action.payload, // Guardamos los datos de la API
            };
        case "FETCH_DATA_TASK":
            return {
                ...state,
                loading: false,
                tasks: action.payload, // Guardamos los datos de la API
            };
        case "FETCH_DATA_TEAMS":
            return {
                ...state,
                loading: false,
                teams: action.payload, // Guardamos los datos de la API
            };
        case "FETCH_DATA_USERS":
            return {
                ...state,
                loading: false,
                users: action.payload, // Guardamos los datos de la API
            };
        case "FETCH_DATA_TASK_ACTIVE":
            return {
                ...state,
                loading: false,
                taskActive: action.payload, // Guardamos los datos de la API
            };
        case "FETCH_DATA_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload, // Guardamos el error
            };
        default:
            return state;
    }
};

export default reducer;


import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { thunk } from "redux-thunk"; // Importamos redux-thunk

const store = createStore(reducer, applyMiddleware(thunk)); // Aplicamos el middleware

export default store;


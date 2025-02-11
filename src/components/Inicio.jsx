import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchTask, fetchTeams, fetchUsers } from "../redux/actions";


export default function Inicio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, users, teams, proyects, loading } = useSelector((state) => state); // Obtener datos del store
    React.useEffect(() => {
        // navigate('/analizeFront')
        dispatch(fetchData())
        dispatch(fetchTask())
        dispatch(fetchTeams())
        dispatch(fetchUsers())
    }, [dispatch])
    if (loading) return <p>Loading...</p>;

    return (

        <Box
            sx={{
                width: '20%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 60%), 1fr))',
                gap: 4,
                justifySelf: 'anchor-center',
                padding: '20px'
            }}
        >
            {
                tasks && users && teams && proyects ?
                    <>

                        <Button variant="contained" color='error' onClick={() => navigate('/analizeFront/proyectos')} >Proyectos</Button>
                        <Button variant="contained" color='warning' onClick={() => navigate('/analizeFront/crearTarea')} >Tareas</Button>
                        <Button variant="contained" color='info' onClick={() => navigate('/analizeFront/usuarios')}>Usuarios</Button>
                        <Button variant="contained" color='success' lonClick={() => navigate('/analizeFront/equipos')}>Equipos</Button>
                    </>
                    : ''}

        </Box>

    );
}
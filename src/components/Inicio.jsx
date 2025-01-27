import React from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Add';


export default function Inicio() {

    const navigate = useNavigate();

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

            <Button variant="contained" color='error' endIcon={<SendIcon />} onClick={() => navigate('/proyectos')}>Proyectos</Button>
            <Button variant="contained" color='warning' endIcon={<SendIcon />} onClick={() => navigate('/crearTarea')} >Tareas</Button>
            <Button variant="contained" color='info' endIcon={<SendIcon />} onClick={() => navigate('/usuarios')}>Usuarios</Button>
            <Button variant="contained" color='success' endIcon={<SendIcon />} onClick={() => navigate('/equipos')}>Equipos</Button>

        </Box>

    );
}
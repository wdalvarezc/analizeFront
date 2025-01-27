import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Add';
import { fetchActiveTask, fetchProyect } from "../redux/actions";
import axios from "axios";


export default function Tasks() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { tasks, users, loading, error, } = useSelector((state) => state); // Obtener datos del store
    const [selectedCard, setSelectedCard] = React.useState(0);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    async function fetchRunTask(id, estado) {
        const res = await axios.put(`https://backinlaze-0bc208007092.herokuapp.com/api/tareas`, { id, estado })
        return res;
    };


    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
                justifySelf: 'anchor-center',
                padding: '20px'
            }}
        >
            {tasks.map((card, index) => (

                <Card>
                    <CardActionArea
                        onClick={() => {
                            setSelectedCard(index)
                        }}
                        data-active={selectedCard === index ? '' : undefined}
                        sx={{
                            height: '100%',
                            '&[data-active]': {
                                backgroundColor: 'action.selected',
                                '&:hover': {
                                    backgroundColor: 'action.selectedHover',
                                },
                            },
                        }}
                    >
                        <CardContent sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {`Límite:  ${card.fecha_limite}`}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {card.titulo}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}> {`${card.estado}`}</Typography>
                                <Typography variant="body2">
                                    {`Descripcion: ${card.descripcion}`}
                                </Typography>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {`${users && card.UserId ? users.filter((e) => e.id === card.UserId)[0]['nombre'] : ''}`}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ flexDirection: "column" }}>
                                {!card.UserId ?
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => {
                                            dispatch(fetchActiveTask(card))
                                            navigate('/asignarTarea')
                                        }}>
                                        Asignar Usuario
                                    </Button>
                                    : ''
                                }
                                <Button
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => {
                                        fetchRunTask(card.id, 'Por hacer').then(dispatch(fetchProyect(card.ProyectId)))
                                    }}>
                                    Por Hacer
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="success"
                                    size="small"
                                    onClick={() => {
                                        fetchRunTask(card.id, 'En Progreso').then(dispatch(fetchProyect(card.ProyectId)))
                                    }}>
                                    En Progreso
                                </Button>
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        fetchRunTask(card.id, 'Terminada').then(dispatch(fetchProyect(card.ProyectId)) )
                                    }}>
                                    Terminada
                                </Button>
                            </CardActions>

                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}


            <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/crearTarea')} />
        </Box>
    );
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchProyect, fetchTeams } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Add';




export default function Proyect() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { proyects, loading, error } = useSelector((state) => state); // Obtener datos del store
    const [selectedCard, setSelectedCard] = React.useState(0);
    console.log(proyects)
    useEffect(() => {
        dispatch(fetchData()); // Despachar la acción para obtener los datos
        dispatch(fetchTeams()); // Despachar la acción para obtener los datos; // Despachar la acción para obtener los datos // Despachar la acción para obtener los datos
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


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


            {proyects.map((card, index) => (

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
                            <Typography variant="h5" component="div">
                                {card.nombre}
                            </Typography>
                            {
                                card?.Teams.length > 0 ?
                                    card.Teams.map((e) => {
                                        return <Typography variant="h9" component="div">
                                            {`* ${e.nombre}`}
                                        </Typography>
                                    })

                                    : ''
                            }

                            <CardActions sx={{ flexDirection: "column" }}>
                                <Button
                                    size="small"
                                    color="secondary"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => {
                                        dispatch(fetchProyect(card.id))
                                        navigate('/details')
                                    }}>
                                    Crear Tareas
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => {
                                        navigate('/proyectosEquipos')
                                    }}>
                                    Asignar Equipo
                                </Button>
                            </CardActions>
                        </CardContent>

                    </CardActionArea>
                </Card>
            ))}

            <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/crearProyectos')} />
        </Box>

    );
}
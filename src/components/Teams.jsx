import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Add';


export default function Teams() {

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { teams, loading, error } = useSelector((state) => state); // Obtener datos del store
    const [selectedCard, setSelectedCard] = React.useState(0);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


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
            {teams.map((card, index) => (

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
                            </CardContent>
                            <CardActions>
                                <Button size="small">Asignar</Button>
                            </CardActions>

                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}


            <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/crearEquipo')} />
        </Box>
    );
}
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Add';
import { fetchTeams } from "../redux/actions";


export default function Teams() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(fetchTeams())
    },[dispatch])
    const { teams, loading, error } = useSelector((state) => state); // Obtener datos del store
    const [selectedCard, setSelectedCard] = React.useState(0);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(teams)


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
                                    {` ${card.nombre}`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=> navigate('/asignarEquipos')}>Agregar Usuarios</Button>
                            </CardActions>

                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}


            <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/crearEquipos')} />
        </Box>
    );
}
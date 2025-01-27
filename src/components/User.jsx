import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchProyect, fetchTeams, fetchUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Add';

export default function User() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state); // Obtener datos del store
    const [selectedCard, setSelectedCard] = React.useState(0);

    useEffect(() => {
        dispatch(fetchData()); 
        dispatch(fetchTeams());
        dispatch(fetchUsers());
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


            {users.map((card, index) => (

                <Card>
                    <CardActionArea
                        onClick={() => {
                            setSelectedCard(index)
                            dispatch(fetchProyect(card.id))
                            navigate('/analizeFront/details')
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
                            <Typography variant="h9" component="div">
                                {card.email}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

            <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigate('/analizeFront/crearUsuario')} />
        </Box>

    );
}
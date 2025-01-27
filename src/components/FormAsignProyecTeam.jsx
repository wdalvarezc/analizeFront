import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchTeams } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import { Button, Autocomplete, Typography } from '@mui/material';

export default function FormAsignProyecTeam() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { proyects, teams } = useSelector((state) => state);

    const [formData, setFormData] = React.useState({});
    console.log(formData)
    React.useEffect(() => {
        dispatch(fetchData()); // Despachar la acción para obtener los datos
        dispatch(fetchTeams()); // Despachar la acción para obtener los datos
    }, [dispatch]);


    // Manejar cambios en los campos del formulario

    const handleSkillsChange = (event, value) => {
        setFormData({ ...formData, proyect: value });
    };

    const handleTeamChange = (event, value) => {
        setFormData({ ...formData, team: value });
    };
    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData2 = { ProyectId: formData.proyect.id, TeamId: formData.team.id }
            await axios.post("https://backinlaze-0bc208007092.herokuapp.com/api/proyectos/addTeam", formData2)
                .then(() => {

                    Swal.fire({
                        title: "Éxito",
                        text: "Formulario enviado con éxito",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    }).then(() => navigate('/analizeFront/'));

                });

            // Reinicia los datos del formulario
            setFormData({
                users: [],
                nombre: '',
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error al enviar el formulario. Inténtalo nuevamente.");
        }

    };

    return (
        <Box
            component="form"
            sx={{ m: 1, width: '60%', padding: '20px', justifySelf: 'center', backgroundColor: 'white', borderRadius: '15px' }}
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h1" align="center" gutterBottom>
                Asignar Proyecto a un Equipo
            </Typography>
            <div>
                <Autocomplete
                    sx={{ paddingBottom: '10px' }}
                    id="nombre"
                    name="nombre"
                    options={teams}
                    onChange={handleTeamChange}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Equipo"
                        />
                    )}
                />
                <Autocomplete
                    id="tags-outlined"
                    name="users"
                    options={proyects}
                    onChange={handleSkillsChange}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Proyecto"
                        />
                    )}
                />


                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Crear
                </Button>
            </div>

        </Box>
    );
}

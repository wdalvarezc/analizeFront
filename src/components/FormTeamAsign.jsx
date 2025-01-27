import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchTeams, fetchUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import { Button, Autocomplete, Typography } from '@mui/material';

export default function FormTeamAsign() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, teams } = useSelector((state) => state);

    const [formData, setFormData] = React.useState({
        users: [],
    });
    console.log(formData)

    React.useEffect(() => {
        dispatch(fetchData()); // Despachar la acción para obtener los datos
        dispatch(fetchUsers()); // Despachar la acción para obtener los datos
        dispatch(fetchTeams()); // Despachar la acción para obtener los datos
    }, [dispatch]);


    // Manejar cambios en los campos del formulario

    const handleSkillsChange = (event, value) => {
        setFormData({ ...formData, users: value });
    };

    const handleTeamChange = (event, value) => {
        setFormData({ ...formData, team: value });
    };
    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData2 = { TeamId: formData.team.id, users: formData.users }
            await axios.post("https://backinlaze-0bc208007092.herokuapp.com/api/usuarios/addTeam", formData2)
                .then(() => {

                    Swal.fire({
                        title: "Éxito",
                        text: "Formulario enviado con éxito",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    }).then(() => navigate('/'));

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
                Nuevo Equipo
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
                    multiple
                    id="tags-outlined"
                    name="users"
                    options={users}
                    onChange={handleSkillsChange}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Integrantes"
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

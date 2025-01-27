import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import { Button, Autocomplete, Typography } from '@mui/material';

export default function AlertAsign() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { taskActive, users } = useSelector((state) => state);

    const [formData, setFormData] = React.useState({
        user: {},
    });
    console.log(formData)
    React.useEffect(() => {
        dispatch(fetchUsers()); // Despachar la acción para obtener los datos
    }, [dispatch]);


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillsChange = (event, value) => {
        setFormData({ ...formData, user: value });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { id: taskActive.id, UserId: formData.user.id }
        try {
            const response = await axios.put("https://backinlaze-0bc208007092.herokuapp.com/api/tareas", data);

            if (response.status !== 200) {
                throw new Error(`Error al enviar los datos: ${response.statusText}`);
            }

            console.log("Respuesta de la API:", response.data)

            Swal.fire({
                title: "Éxito",
                text: "Formulario enviado con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => navigate('/analizeFront/'));


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
                Asignar Usuario
            </Typography>
            <div>
                <TextField
                    aria-readonly
                    id="nombre"
                    name="nombre"
                    label="Tarea"
                    value={taskActive.titulo}
                    fullWidth
                    onChange={handleChange}
                    sx={{ paddingTop: '5px', paddingBottom: '10px' }}
                />
                <Autocomplete
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
                    Asignar
                </Button>
            </div>

        </Box>
    );
}

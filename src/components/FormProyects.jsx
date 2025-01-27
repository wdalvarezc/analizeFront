import * as React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import { Button, Typography } from '@mui/material';

export default function FormProyects() {

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        users: [],
    });
    console.log(formData)



    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {users,...data}= formData
        try {
            const response = await axios.post("https://backinlaze-0bc208007092.herokuapp.com/api/proyectos", data);

            if (response.status !== 200) {
                throw new Error(`Error al enviar los datos: ${response.statusText}`);
            }

            Swal.fire({
                title: "Éxito",
                text: "Formulario enviado con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => navigate('/'));


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
                Nuevo Proyecto
            </Typography>
            <div>
                <TextField
                    required
                    id="nombre"
                    name="nombre"
                    label="Nombre del Proyecto"
                    value={formData.nombre}
                    fullWidth
                    onChange={handleChange}
                    sx={{ paddingTop: '5px', paddingBottom:'10px' }}
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

import * as React from 'react';
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import { Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export default function FormUser() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const admin = [
        { value: true, valor:'SI' },
        { value: false, valor: 'NO' },
    ]


    const [formData, setFormData] = React.useState({
        admin: false, // Campo para la fecha 
    });

    React.useEffect(() => {
        dispatch(fetchData()); // Despachar la acción para obtener los datos
    }, [dispatch]);


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://backinlaze-0bc208007092.herokuapp.com/api/usuarios", formData);
            if (response.status !== 200) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                  });
                throw new Error(`Error al enviar los datos: ${response.statusText}`);
            }
            Swal.fire({
                title: "Éxito",
                text: "Usuario Creado",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => navigate('/'));


            // Reinicia los datos del formulario
            setFormData({
                nombre: null,
                email: '',
                admin: ''
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un error. Inténtalo nuevamente.",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
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
                Nuevo Usuario
            </Typography>
            <div>
                <TextField
                    required
                    id="Nombre"
                    name="nombre"
                    label="Nombre"
                    value={formData.nombre}
                    fullWidth
                    onChange={handleChange}
                    sx={{ paddingTop: '5px' }}
                />
                <TextField
                    required
                    id="Email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    fullWidth
                    onChange={handleChange}
                    sx={{ paddingTop: '5px' }}
                />

                <FormControl fullWidth sx={{ paddingTop: '10px' }}>
                    <InputLabel sx={{ paddingTop: '10px' }}>Administrador</InputLabel>
                    <Select
                        labelId="admin"
                        id="admin"
                        name="admin"
                        onChange={handleChange}
                    >
                        {admin.map((e) => {
                            return <MenuItem value={e.value}>{`${e.valor}`}</MenuItem>
                        })}
                    </Select>
                </FormControl>
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

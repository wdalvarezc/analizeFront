import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// eslint-disable-next-line no-unused-vars
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export default function FormTask() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = [
        { value: "Por Hacer" },
        { value: "En Progreso" },
        { value: "Terminada" },
    ]
    const { proyects } = useSelector((state) => state);

    const [formData, setFormData] = React.useState({
        fecha_limite: null, // Campo para la fecha 
    });

    React.useEffect(() => {
        dispatch(fetchData()); // Despachar la acción para obtener los datos
    }, [dispatch]);


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar cambio en el campo de fecha
    const handleDateChange = (date) => {
        setFormData({ ...formData, fecha_limite: date.format("YYYY-MM-DD") });
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/tareas", formData);

            if (response.status !== 200) {
                throw new Error(`Error al enviar los datos: ${response.statusText}`);
            }

            console.log("Respuesta de la API:", response.data);
            Swal.fire({
                title: "Éxito",
                text: "Formulario enviado con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
              }).then(()=> navigate('/'));
            

            // Reinicia los datos del formulario
            setFormData({
                fecha_limite: null,
                titulo: '',
                descripcion: '',
                estado: ''
            });
        } catch (error) {
            console.log("Error al enviar los datos:", error);
            alert("Hubo un error al enviar el formulario. Inténtalo nuevamente.");
        }

    };

    return (
        <Box
            component="form"
            sx={{ m: 1, width: '60%', padding: '20px', justifySelf: 'center' , backgroundColor:'white',borderRadius:'15px'}}
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h1" align="center" gutterBottom>
                Nueva Tarea
            </Typography>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <TextField
                        required
                        id="Titulo"
                        name="titulo"
                        label="Título"
                        value={formData.titulo}
                        fullWidth
                        onChange={handleChange}
                        sx={{ paddingTop: '5px' }}
                    />
                    <TextField
                        required
                        id="Descripcion"
                        name="descripcion"
                        label="Descripción"
                        value={formData.descripcion}
                        fullWidth
                        onChange={handleChange}
                        sx={{ paddingTop: '5px' }}
                    />
                    <FormControl fullWidth sx={{ paddingTop: '10px' }}>
                        <InputLabel sx={{ paddingTop: '10px' }}>Estado</InputLabel>
                        <Select
                            labelId="estado"
                            id="estado"
                            name="estado"
                            onChange={handleChange}
                        >
                            {status.map((e) => {
                                return <MenuItem value={e.value}>{`${e.value}`}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ paddingTop: '10px' }}>
                        <InputLabel sx={{ paddingTop: '10px' }}>Proyecto</InputLabel>
                        <Select
                            labelId="Proyecto"
                            id="ProyectId"
                            name="ProyectId"
                            onChange={handleChange}
                        >
                            {proyects.map((e) => {
                                return <MenuItem value={e.id}>{`${e.nombre}`}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <h3>Fecha Límite:</h3>
                    <DateCalendar onChange={handleDateChange} />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Crear
                    </Button>
                </LocalizationProvider>
            </div>

        </Box>
    );
}

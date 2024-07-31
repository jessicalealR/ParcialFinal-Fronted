const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Configurar el middleware para archivos estáticos y análisis de formularios
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para la página principal (consulta de prácticas de un docente)
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la vista principal
});

// Ruta para mostrar prácticas basadas en el ID del docente
app.post('/practices/teacher', async (req, res) => {
  try {
    const teacherId = req.body.teacherId;
    const response = await axios.get(`http://localhost:8080/practicas/docente/${teacherId}`);
    const practices = response.data;
    res.render('practices', { practices });
  } catch (error) {
    console.error('Error fetching practices:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Ruta para mostrar estudiantes basados en el ID de la práctica
app.post('/students/practice', async (req, res) => {
  try {
    const practiceId = req.body.practiceId;
    const response = await axios.get(`http://localhost:8080/practicas/${practiceId}/estudiantes`);
    const students = response.data;
    res.render('students', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Ruta para mostrar resumen de prácticas para un periodo académico
app.post('/practices/summary', async (req, res) => {
  try {
    const academicPeriod = req.body.academicPeriod;
    const response = await axios.get(`http://localhost:8080/practicas/periodo/${academicPeriod}`);
    const summary = response.data;
    res.render('summary', { summary });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Configurar el middleware para archivos estáticos y análisis de formularios
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Leer datos desde archivos JSON (o de donde provengan)
//const practicesData = JSON.parse(fs.readFileSync('./data/practices.json', 'utf-8'));
//const studentsData = JSON.parse(fs.readFileSync('./data/students.json', 'utf-8'));

// Ruta para la página principal (consulta de prácticas de un docente)
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la vista principal
});

// Ruta para mostrar prácticas basadas en el ID del docente
app.post('/practices/teacher', (req, res) => {
  const teacherId = req.body.teacherId;
  const practices = practicesData.filter(practice => practice.teacherId === teacherId);
  res.render('practices', { practices });
});

// Ruta para mostrar estudiantes basados en el ID de la práctica
app.post('/students/practice', (req, res) => {
  const practiceId = req.body.practiceId;
  const students = studentsData.filter(student => student.practiceId === practiceId);
  res.render('students', { students });
});

// Ruta para mostrar resumen de prácticas para un periodo académico
app.post('/practices/summary', (req, res) => {
  const academicPeriod = req.body.academicPeriod;
  const summary = practicesData.filter(practice => practice.academicPeriod === academicPeriod);
  res.render('summary', { summary });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

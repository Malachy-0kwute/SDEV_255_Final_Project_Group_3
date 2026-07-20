const express = require('express');

// db
const connectDB = require('./src/db/db');

// routes
const courseRoutes = require('./src/routes/courseRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teachersRoutes');

const app = express();
const port = 3000;

// connet to db 
connectDB();

// middlewares
app.use(express.json());
app.use('/api/course', courseRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
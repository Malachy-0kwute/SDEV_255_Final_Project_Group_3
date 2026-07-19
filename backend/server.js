const express = require('express');
const connectDB = require('./src/db/db');

const app = express();

connectDB();
app.use(express.json());

const port = 3000;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
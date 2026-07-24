const express = require("express");
const cors = require("cors");

// db
const connectDB = require("./src/db/db");

// routes
const courseRoutes = require("./src/routes/courseRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const teacherRoutes = require("./src/routes/teachersRoutes");

const app = express();
const port = 3000;

// connect to db
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/course", courseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
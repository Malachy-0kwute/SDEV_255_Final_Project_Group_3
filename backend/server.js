const express = require("express");
const cors = require("cors");

// db
const connectDB = require("./src/db/db");

// routes
const courseRoutes = require("./src/routes/courseRoutes");
// const studentRoutes = require("./src/routes/studentRoutes");
// const teacherRoutes = require("./src/routes/teachersRoutes");
const authRoutes = require("./src/routes/auth");

const app = express();
const port = process.env.PORT || 5000;

// connect to db
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// define endpoints.
app.use("/api/course", courseRoutes);
app.use("/api/auth", authRoutes);

//#region Deprecated
// app.use("/api/student", studentRoutes);
// app.use("/api/teacher", teacherRoutes);
//#endregion

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running...`);
});
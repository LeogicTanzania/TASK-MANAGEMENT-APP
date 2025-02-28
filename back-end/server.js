require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db.js");
const taskRoutes = require("./routes/Task.js");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

//Connect to the MongoDB
connectDB();

// MIDDLEWARES:
// to parse JSON
app.use(express.json());
// to use CORS
app.use(cors());

// Register Routes
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`TASK MANAGEMENT SERVER RUNNING AT http://localhost:${PORT}`);
});

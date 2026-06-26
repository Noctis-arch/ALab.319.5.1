import 'dotenv/config';

import express from "express";

import connectDB from "./db/conn.js";

const PORT = 3000;
const app = express();

await connectDB();

import grades from "./routes/grades.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

import dotenv from "dotenv";
import express from "express";
import { connectToDb } from "./config/connectToDb.js";
//import connectToDb from "./backend/config/connectToDb.js";

import { Patient } from "./models/patient.js";
import cors from "cors";
// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./backend/.env" });
}

// Create express app
const app = express();
// Configure express app to parse JSON
app.use(express.json());
app.use(cors());
// Connect to the database and start the server after successful connection
connectToDb().then(() => {
  console.log("Successfully connected to the database.");

  // Routes
});

app.get("/about", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients." });
  }
});

app.post("/about", async (req, res) => {
  try {
    // Extract patient information from the request body
    let { name, age, medication, date } = req.body;

    // If the date is "today", set it to the current date
    if (date === "today") {
      date = new Date();
    }

    // Create a new patient document in the database
    const patient = await Patient.create({
      name,
      age,
      medication,
      date,
    });

    // Respond with the created patient's details
    res.json({
      message: `Patient ${patient.name} is ${patient.age} years old and is taking ${patient.medication}. The date is ${patient.date}.`,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient." });
  }
});

app.delete("/about/:id", async (req, res) => {
  try {
    // Extract the patient ID from the route parameters
    const patientId = req.params.id;

    // Find the patient by ID and delete it
    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Respond with a success message
    res.json({
      message: `Patient with ID ${patientId} has been successfully deleted.`,
    });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Failed to delete patient." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

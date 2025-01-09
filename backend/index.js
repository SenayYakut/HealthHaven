import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// Allow only the frontend to access
app.use(
  cors({
    origin: "http://localhost:8080", // Frontend's address
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306, // Default to 3306 if not specified
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL!");
});

// Route to check if the backend is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Route to retrieve all providers
app.get("/providers", (req, res) => {
  const query = "SELECT * FROM providers";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error retrieving providers");
    }
    res.json(results); // Send the results as JSON response
  });
});

// Route to search providers by location and symptoms

app.get("/providers/search", (req, res) => {
  const { location, symptoms } = req.query; // Get location and symptoms

  // Ensure both location and symptoms are provided for filtering
  if (!location || !symptoms) {
    return res.status(400).send("Please provide both location and symptoms");
  }

  // Parse the symptoms from JSON if sent as a string
  const symptomsArray = JSON.parse(symptoms);

  const query = `
    SELECT * 
    FROM providers 
    WHERE location = ? 
    AND symptoms LIKE ?`;

  // Use the LIKE operator to allow partial matching for symptoms
  connection.query(
    query,
    [location, `%${symptomsArray.join("%")}%`],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).send("Error retrieving providers");
      }
      res.json(results); // Send the results as a JSON response
    }
  );
});

/*app.get("/providers/search", (req, res) => {
  const { location, symptoms } = req.query; // Get location and symptoms

  // Check if both location and symptoms are provided
  if (!location || !symptoms) {
    return res.status(400).send("Please provide both location and symptoms");
  }

  // Split symptoms string by '|' to treat each symptom individually
  const symptomsArray = symptoms.split("|");

  // Create individual LIKE conditions for each symptom
  const symptomConditions = symptomsArray
    .map((symptom) => `symptoms LIKE '%${symptom}%'`)
    .join(" OR ");

  const query = `
    SELECT * 
    FROM providers 
    WHERE location = ? 
    AND (${symptomConditions})`;

  // Execute the query
  connection.query(query, [location], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error retrieving providers");
    }
    // Return the results as JSON response
    res.json(results);
  });
});

app.get("/providers/search", (req, res) => {
  const { location, symptoms } = req.query; // Get location and symptoms

  // Ensure both location and symptoms are provided
  if (!location || !symptoms) {
    return res.status(400).send("Please provide both location and symptoms.");
  }

  // Split the symptoms by the '|' delimiter and create multiple LIKE conditions
  const symptomsArray = symptoms.split("|");

  // Create individual LIKE conditions for each symptom and join them with OR
  const symptomConditions = symptomsArray
    .map((symptom) => `symptoms LIKE '%${symptom}%'`)
    .join(" OR ");

  // Query to get providers who match the location and at least one symptom
  const query = `
    SELECT * 
    FROM providers 
    WHERE location = ? 
    AND (${symptomConditions})
  `;

  connection.query(query, [location], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error retrieving providers.");
    }
    res.json(results); // Return the results as a JSON response
  });
});
*/
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

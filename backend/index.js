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

// Route to search providers by location
app.get("/providers/search", (req, res) => {
  const { location } = req.query; // Get location

  // Ensure location is provided for filtering
  if (!location) {
    return res.status(400).send("Please provide location");
  }

  const query = `
    SELECT * 
    FROM providers 
    WHERE location = ?`;

  connection.query(query, [location], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error retrieving providers");
    }
    res.json(results); // Send the results as a JSON response
  });
});

// Route to add a new provider
app.post("/providers", (req, res) => {
  const { name, location, symptoms } = req.body;

  if (!name || !location || !symptoms) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO providers (name, location, symptoms) VALUES (?, ?, ?)";
  connection.query(query, [name, location, symptoms], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error adding provider.");
    }
    res.status(201).send("Provider added successfully.");
  });
});

// Declare the port just once
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

/*import express from "express";
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

// Route to search providers by location
app.get("/providers/search", (req, res) => {
  const { location } = req.query; // Get location

  // Ensure location is provided for filtering
  if (!location) {
    return res.status(400).send("Please provide location");
  }

  const query = `
    SELECT * 
    FROM providers 
    WHERE location = ?`;

  connection.query(query, [location], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error retrieving providers");
    }
    res.json(results); // Send the results as a JSON response
  });
});

// Route to add a new provider
app.post("/providers", (req, res) => {
  const { name, location, symptoms } = req.body;

  if (!name || !location || !symptoms) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO providers (name, location, symptoms) VALUES (?, ?, ?)";
  connection.query(query, [name, location, symptoms], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error adding provider.");
    }
    res.status(201).send("Provider added successfully.");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

/*import express from "express";
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

app.post("/providers", (req, res) => {
  const { name, location, symptoms } = req.body;

  if (!name || !location || !symptoms) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO providers (name, location, symptoms) VALUES (?, ?, ?)";
  connection.query(query, [name, location, symptoms], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error adding provider.");
    }
    res.status(201).send("Provider added successfully.");
  });
});

// Execute the query
connection.query(query, [location], (err, results) => {
  if (err) {
    console.error("Error executing query:", err.message);
    return res.status(500).send("Error retrieving providers");
  }
  // Return the results as JSON response
  res.json(results);
});

/*app.get("/providers/search", (req, res) => {
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

/*import express from "express";
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
  console.log("Location:", location); // Log location
  console.log("Symptoms:", symptoms); // Log symptoms

  // Ensure both location and symptoms are provided for filtering
  if (!location || !symptoms) {
    return res.status(400).send("Please provide both location and symptoms");
  }

  // Parse the symptoms from JSON if sent as a string

  const symptomsArray = symptoms.split(",");
  console.log(symptomsArray);
  const symptomConditions = symptomsArray
    .map((symptom) => `symptoms LIKE '%${symptom.trim()}%'`)
    .join(" OR "); // Combine the conditions using OR for partial matching

  const query = `
    SELECT * 
    FROM providers 
    WHERE location = ? 
    AND (${symptomConditions})`;

  // Use the LIKE operator to allow partial matching for symptoms

  connection.query(query, [location], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error retrieving providers.");
    }
    res.json(results); // Return the results as a JSON response
  });
});

// Route to add a new provider (if needed)
app.post("/providers", (req, res) => {
  const { name, location, symptoms } = req.body;

  if (!name || !location || !symptoms) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO providers (name, location, symptoms) VALUES (?, ?, ?)";
  connection.query(query, [name, location, symptoms], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Error adding provider.");
    }
    res.status(201).send("Provider added successfully.");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
*/

/*import express from "express"; // Use `import` instead of `require`
import mysql from "mysql2"; // Using `mysql2` instead of `mysql`
import cors from "cors";
const app = express();
const port = 3000;

// Middleware to handle CORS
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost", // Database host
  user: "root", // Database user
  password: "", // Database password
  database: "test", // Database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Search for providers based on location and symptoms
app.get("/providers/search", (req, res) => {
  const location = req.query.location.trim(); // Ensure location is trimmed of extra spaces
  const symptoms = req.query.symptoms ? req.query.symptoms.split(",") : [];

  console.log("Location received:", location); // Log the location
  console.log("Symptoms received:", symptoms); // Log the symptoms

  // SQL query to search providers by location (and symptoms if provided)
  let query = "SELECT * FROM providers WHERE LOWER(location) = LOWER(?)";
  let queryParams = [location];

  // Add symptoms filter if symptoms are provided
  if (symptoms.length > 0) {
    const symptomConditions = symptoms
      .map(() => "FIND_IN_SET(?, symptoms)")
      .join(" OR ");
    query += ` AND (${symptomConditions})`;
    queryParams = [...queryParams, ...symptoms];
  }

  // Execute the query
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Failed to fetch providers" });
    }

    // Return the results (providers)
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

// Import necessary modules
/*import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());

// Create MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Routes

// Example route to fetch providers
app.get("/providers", (req, res) => {
  connection.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.error("Error fetching providers:", err);
      res.status(500).json({ error: "Failed to fetch providers" });
    } else {
      res.json(results);
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/

/*import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

// GET method to fetch providers
app.get("/providers", async (req, res) => {
  const { location, symptoms } = req.query;

  if (!location) {
    return res.status(400).send("Location is required.");
  }

  try {
    const query = `SELECT * FROM providers WHERE location = ? AND symptoms LIKE ?`;
    const results = await pool
      .promise()
      .query(query, [location, `%${symptoms}%`]);

    if (results[0].length === 0) {
      return res.status(404).send("No providers found.");
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).send("Error fetching providers. Please try again.");
  }
});

/*app.get("/providers", (req, res) => {
  const { location, symptoms } = req.query;

  let query = "SELECT * FROM providers";
  let values = [];

  if (location) {
    query += " WHERE location = ?";
    values.push(location);
  }

  if (symptoms) {
    if (location) {
      query += " AND symptoms LIKE ?";
    } else {
      query += " WHERE symptoms LIKE ?";
    }
    values.push(`%${symptoms}%`);
  }

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error fetching providers:", err);
      return res.status(500).json({ message: "Failed to fetch providers" });
    }
    res.status(200).json(results);
  });
});
*/
// POST method to add a new provider
/*pp.post("/providers", (req, res) => {
  const { name, specialty, location, symptoms } = req.body;

  // Validate input fields
  if (!name || !specialty || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Insert the new provider into the database
  const query =
    "INSERT INTO providers (name, specialty, location, symptoms) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [name, specialty, location, symptoms],
    (err, result) => {
      if (err) {
        console.error("Error inserting provider:", err);
        return res.status(500).json({ message: "Failed to add provider" });
      }
      res.status(201).json({
        message: "Provider added successfully",
        providerId: result.insertId,
      });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

/*import express from "express";
import mysql from "mysql2"; // Use mysql2 to connect to MySQL
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MySQL connection setup
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

app.get("/providers", (req, res) => {
  const { location, symptoms } = req.query;
  console.log("Location:", location, "Symptoms:", symptoms);

  // Validate input
  if (!location || !symptoms) {
    return res
      .status(400)
      .json({ error: "Location and symptoms are required." });
  }

  const query = `
    SELECT * FROM providers
    WHERE location = ?
    AND symptoms LIKE ?
  `;

  // Execute the query with proper escaping to prevent SQL injection
  pool.query(query, [location, `%${symptoms}%`], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Error querying database" });
    }

    // Return the results as JSON
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/

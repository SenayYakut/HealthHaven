/*import React, { useState, useEffect } from "react";
import axios from "axios";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/providers");
        console.log("Response Data:", response.data);
        setProviders(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching providers:", error.message);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div>
      <h1>Providers</h1>
      {providers.length > 0 ? (
        <ul>
          {providers.map((provider) => (
            <li key={provider.id}>
              {provider.name} - {provider.specialty}
            </li>
          ))}
        </ul>
      ) : (
        <p>No providers available.</p>
      )}
    </div>
  );
};

export default Providers;


import React, { useState } from "react";
import axios from "axios";

const Providers = () => {
  const [location, setLocation] = useState(""); // User's search input
  const [providers, setProviders] = useState([]); // Search results
  const [error, setError] = useState(null); // Handle errors

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/providers/search?location=${location}`
      );
      setProviders(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching providers:", err.message);
      setError("Failed to fetch providers. Please try again.");
    }
  };

  return (
    <div>
      <h1>Search Providers by Location</h1>
      <input
        type='text'
        placeholder='Enter location'
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update search input
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {providers.length > 0 ? (
          <ul>
            {providers.map((provider) => (
              <li key={provider.id} style={{ listStyleType: "none" }}>
                <strong>{provider.name}</strong> - {provider.specialty} in{" "}
                {provider.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>No providers found for the specified location.</p>
        )}
      </div>
    </div>
  );
};

export default Providers;
*

import React, { useState } from "react";
import axios from "axios";

const Providers = () => {
  const [location, setLocation] = useState(""); // User's location input
  const [symptoms, setSymptoms] = useState(""); // User's symptoms input
  const [providers, setProviders] = useState([]); // Search results
  const [error, setError] = useState(null); // Handle errors

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/providers/search?location=${location}&symptoms=${symptoms}`
      );
      setProviders(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching providers:", err.message);
      setError("Failed to fetch providers. Please try again.");
    }
  };

  return (
    <div>
      <h1>Search Providers by Location and Symptoms</h1>
      <input
        type='text'
        placeholder='Enter location'
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update location input
      />
      <input
        type='text'
        placeholder='Enter symptoms (e.g., chest pain)'
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)} // Update symptoms input
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {providers.length > 0 ? (
          <ul>
            {providers.map((provider) => (
              <li key={provider.id}>
                <strong>{provider.name}</strong> - {provider.specialty} in{" "}
                {provider.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>No providers found for the specified location and symptoms.</p>
        )}
      </div>
    </div>
  );
};

export default Providers;

*/
import React, { useState } from "react";
import axios from "axios";

const Providers = () => {
  const [location, setLocation] = useState(""); // User's city input
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Array of selected symptoms
  const [providers, setProviders] = useState([]); // Search results
  const [error, setError] = useState(null); // Handle errors

  const symptomsList = [
    "Chest pain",
    "Fatigue",
    "Headache",
    "Shortness of breath",
    "Dizziness",
    "Cough",
    "Nausea",
    "Fever",
  ]; // Predefined list of symptoms for checkboxes

  // Update selected symptoms when checkbox is checked or unchecked
  const handleSymptomChange = (e) => {
    const symptom = e.target.value;
    if (e.target.checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]); // Add selected symptom
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom)); // Remove unselected symptom
    }
  };

  // Handle search when the user clicks the search button

  const handleSearch = async () => {
    try {
      // Send selected symptoms as query parameters along with location
      const response = await axios.get(
        `http://localhost:3000/providers/search?location=${location}&symptoms=${JSON.stringify(
          selectedSymptoms
        )}`
      );
      setProviders(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching providers:", err.message);
      setError("Failed to fetch providers. Please try again.");
    }
  };

  return (
    <div>
      <h1>Search Providers by City and Symptoms</h1>

      {/* Location input */}
      <input
        type='text'
        placeholder='Enter city'
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update city input
      />

      {/* Symptoms checkboxes */}
      <h3>Select Symptoms:</h3>
      {symptomsList.map((symptom) => (
        <div key={symptom}>
          <input
            type='checkbox'
            value={symptom}
            onChange={handleSymptomChange}
          />
          <label>{symptom}</label>
        </div>
      ))}

      <button onClick={handleSearch}>Search</button>

      {/* Display error if any */}
      {error && <p>{error}</p>}

      {/* Display providers */}
      {providers.length > 0 && (
        <div>
          <h3>Providers List</h3>
          <ul>
            {providers.map((provider) => (
              <li key={provider.id}>
                {provider.name} - {provider.specialty}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Providers;

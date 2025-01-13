import React, { useState } from "react";
import axios from "axios";

const SearchProviders = () => {
  const [location, setLocation] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      // Make GET request to backend with location and symptoms as query parameters
      // const response = await axios.get(
      // `http://localhost:3000/providers?location=${location}`
      // );
      const response = await axios.get(
        `http://localhost:3000/providers/search`,
        {
          params: { location },
        }
      ); // Send
      setProviders(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch providers. Please try again.");
      console.error("Error fetching providers:", err);
    }
  };

  return (
    <div>
      <h1>Search Providers</h1>
      <input
        type='text'
        placeholder='Enter location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter symptoms'
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {providers.length > 0 && (
        <ul>
          {providers.map((provider) => (
            <li key={provider.id}>
              {provider.name} - {provider.specialty} - {provider.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProviders;

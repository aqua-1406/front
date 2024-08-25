import React, { useState } from "react";
import Dropdown from "./Dropdown";
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateJson(jsonInput)) {
      setIsValidJson(true);
      const parsedInput = JSON.parse(jsonInput);
      
      const response = await fetch("https://bfhl-shreyansh-singh.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: parsedInput.data }),
      });
      
      const result = await response.json();
      setResponse(result);
    } else {
      setIsValidJson(false);
    }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    let filteredResponse = {};
    
    if (selectedOptions.includes("Alphabets")) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredResponse.highestLoweralphabet = response.highestLoweralphabet;
    }
    
    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BEC10848</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder='Enter JSON here'
        />
        {!isValidJson && <p style={{ color: "red" }}>Invalid JSON format</p>}
        <button type="submit">Submit</button>
      </form>

      {response && <Dropdown onChange={handleDropdownChange} />}
      {renderResponse()}
    </div>
  );
}

export default App;

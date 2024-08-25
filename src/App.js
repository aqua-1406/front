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
      const parsed = JSON.parse(input);
      return parsed && typeof parsed === 'object' && Array.isArray(parsed.data);
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      setIsValidJson(true);
      // const parsedInput = JSON.parse(jsonInput);
      
      try {
        const apiresponse = await fetch("https://bfhl-shreyansh-singh.onrender.com/bfhl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.parse({data:jsonInput}),
        });
        
        if (!apiresponse.ok) {
          throw new Error("Network response was not ok.");
        }

        const result = await apiresponse.json();
        setResponse(apiresponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsValidJson(false);
      }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    
    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE10848</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          // onChange={handleJsonChange}
          placeholder='Enter JSON here'
        />
        {/* {!isValidJson && <p style={{ color: "red" }}>Invalid JSON format or missing "data" array</p>} */}
        <button type="submit">Submit</button>
      </form>

      {response && <Dropdown onChange={handleDropdownChange} />}
      {renderResponse()}
      {response}
    </div>
  );
}

export default App;

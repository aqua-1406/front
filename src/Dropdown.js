import React from "react";

function Dropdown({ onChange }) {
  const options = [
    "Alphabets",
    "Numbers",
    "Highest lowercase alphabet",
  ];

  const handleSelectChange = (event) => {
    const selected = [...event.target.options]
      .filter(option => option.selected)
      .map(option => option.value);
    onChange(selected);
  };

  return (
    <div>
      <h3>Select Options:</h3>
      <select multiple onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;

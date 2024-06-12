import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ averages, toggleExpandAll }) => {
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/countries")
      .then((response) => response.json())
      .then((data) => {
        console.log("Countries:", data);
        if (
          Array.isArray(data) &&
          data.length === 1 &&
          Array.isArray(data[0].countries)
        ) {
          setCountries(data[0].countries);
        } else {
          console.error("Unable to parse countries data:", data);
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));

    fetch("http://localhost:5000/years")
      .then((response) => response.json())
      .then((data) => {
        console.log("Years data:", data);
        if (
          Array.isArray(data) &&
          data.length === 1 &&
          Array.isArray(data[0].years)
        ) {
          setYears(data[0].years);
        } else {
          console.error("Unable to parse years data:", data);
        }
      })
      .catch((error) => console.error("Error fetching years:", error));
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="header">
      <div className="title-dropdowns">
        <h1 className="title">DRI Report</h1>
        <div className="dropdowns">
          <select
            className="dropdown"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <select
            className="dropdown"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="data">
        <ul>
          <li>
            Country:{" "}
            <span className="inputData">{selectedCountry.toUpperCase()}</span>
          </li>
          <li>
            Year: <span className="inputData">{selectedYear}</span>
          </li>
          <li>
            DRI Equal Weighting:{" "}
            <span className="inputData">{averages.averageValue}</span>
          </li>
          <li>
            DRI Budget Weighting:{" "}
            <span className="inputData">{averages.averageCurrentBudget}</span>
          </li>
        </ul>
      </div>
      <div className="buttons">
        <button className="edit">Edit</button>
        <button className="save">Save</button>
        <button className="delete">Delete</button>
        <button className="expand" onClick={toggleExpandAll}>
          Expand All
        </button>
      </div>
    </div>
  );
};

export default Header;
